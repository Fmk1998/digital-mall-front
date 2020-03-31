<template>
  <div>
    <navheader/>
    <nav-bread><span slot="bread">Goods</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(GoodsList)" :class="{'cur':priceChecked==GoodsList}">{{price.startPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a @click="gotoDetail"><img :src="'/static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ma-overlay hidden" v-show="overLayFlag" @click="closePop"></div>
    <navfooter/>
  </div>
</template>
<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import Navheader from "../components/Navheader"
  import Navfooter from "../components/Navfooter";
  import NavBread from "../components/NavBread";
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: '手机'
          },
          {
            startPrice: '电脑'
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false
      }
    },
    components: {
      NavBread,
      Navheader,
      Navfooter
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        axios.get("/goods").then((result) => {
          let res = result.data;
          this.goodsList = res.result;
        });
      },
      showFilterPop() {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      closePop() {
        this.filterBy = false;
        this.overLayFlag = false;
      },
      setPriceFilter(index){
        this.priceChecked = GoodsList;
        this.closePop();
      },
      gotoDetail() {
        //通过push进行跳转
        this.$router.push('/detail')
      },
    }
  }
</script>
