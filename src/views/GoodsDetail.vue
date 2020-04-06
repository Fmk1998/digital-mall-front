<template>
  <div>
    <navheader/>
    <nav-bread><span slot="bread">Detail</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="accessory-result">
          <!-- search result accessories list -->
          <div class="accessory-list-wrap detail">
            <div class="accessory-list ">
              <el-card class="box-card col-5">
                <el-carousel indicator-position="outside">
                  <el-carousel-item v-for="(item,index) in goodsList" :key="item" >
                    <a href="#"><img class="bimg" :src="'/static/'+item.productImg" alt=""></a>
                  </el-carousel-item>
                </el-carousel>
                <div v-for="o in 4" :key="o" class="text item">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
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
        goodsList: [
          {
            "productId": "10010",
            "productName": "小米8",
            "productPrice": "3499",
            "productImg": "7.jpg"
          }
        ],
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

      },
      showFilterPop() {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      closePop() {
        this.filterBy = false;
        this.overLayFlag = false;
      },
      setPriceFilter(index) {
        this.priceChecked = GoodsList;
        this.closePop();
      }
    }
  }
</script>
<style  scoped>
  @media only screen and (max-width: 650px) {

  }
  .container{
    display: flex;
    justify-content: center;
  }
  .detail{
    margin-top: 30px;
  }
  .el-carousel__item{
    overflow: auto;
  }
  .bimg {
    width: 100%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

</style>
