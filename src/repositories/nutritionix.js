import xhr from 'xhr';
import store from 'store';
import nutritionixActions from 'actions/nutritionix';

const data = function(brand, name) {

  return {
    "appId": process.env.NUTR_APPID,
    "appKey": process.env.NUTR_APPKEY,
    "queries": {
      "item_name": name,
      "brand_name": brand
    },
    "fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit",
       "nf_total_fat", "nf_total_carbohydrate", "nf_protein", "serving_weight_grams", "images_front_full_url"],
    "sort":{
      "field":"_score",
      "order":"desc"
    },
    "filters":{
      "item_type":2
    }
  }
};

const dataSimple = function(query) {

  return {
    "appId": process.env.NUTR_APPID,
    "appKey": process.env.NUTR_APPKEY,
    "query": query,
    "fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit",
       "nf_total_fat", "nf_total_carbohydrate", "nf_protein", "serving_weight_grams", "images_front_full_url"],
    "sort":{
      "field":"_score",
      "order":"desc"
    },
    "filters":{
      "item_type":2,
    }
  }
};

export default {
  fetch: function({ brand, name }) {
    return new Promise(function(resolve, reject) {
      xhr(`https://api.nutritionix.com/v1_1/search`, { method: 'POST', json: data(brand, name) },
      function(err, resp, body) {
        if (resp.statusCode === 401) {
          console.log("nutritionix err", err, resp, body);

        }
        else if (resp.statusCode === 200 && resp.body) {
          const food_search = body.hits;
          store.dispatch(nutritionixActions.saveSearch(food_search));
        }
      })
    })
  },
  fetchSimple: function({ query }) {
    return new Promise(function(resolve, reject) {
      xhr(`https://api.nutritionix.com/v1_1/search`, { method: 'POST', json: dataSimple(query) },
      function(err, resp, body) {
        if (resp.statusCode === 401) {
          console.log("nutritionix err", err, resp, body);

        }
        else if (resp.statusCode === 200 && resp.body) {
          const food_search = body.hits;
          store.dispatch(nutritionixActions.saveSearch(food_search));
        }
      })
    })
  }
}
