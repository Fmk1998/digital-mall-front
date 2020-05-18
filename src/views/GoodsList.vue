<template>
  <div>
    <el-backtop></el-backtop>
    <navheader/>
    <nav-bread><span slot="bread">商品</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in carouselImg" :key="item.id">
            <img class="carouselImg" :src="'static/carousel/'+item.cImg" alt=""/>
          </el-carousel-item>
        </el-carousel>
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" :class="{'cur':sortChecked==='default'}">默认</a>
          <a @click="sortByPrice" class="price" :class="{'cur':sortChecked==='price'}">价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a @click="sortByTime" class="price" :class="{'cur':sortChecked==='time'}">时间
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">分类</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>类别:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':categoryChecked==='all'}" @click="checkedAll">All</a>
              </dd>
              <dd v-for="(category,index) in categoryFilter">
                <a href="javascript:void(0)" @click="setCategoryFilter(category.cid)"
                   :class="{'cur':categoryChecked===category.cid}">{{category.cname}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a @click="gotoDetail(item.pid)"><img :src="item.pimg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.pname}}</div>
                    <div class="price">{{item.price}}元</div>
                    <el-button style="float: right;margin-bottom: 10px" @click="addCartList(item.pid)">加入购物车</el-button>
                  </div>
                </li>
              </ul>
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-size="page.size"
                :current-page="page.current"
                :total="page.total">
              </el-pagination>
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
  import {api} from "../server";

  export default {
    data() {
      return {
        carouselImg: [
          {"cImg": "carouselImg1.jpg"},
          {"cImg": "carouselImg2.jpg"},
          {"cImg": "carouselImg3.jpg"},
          {"cImg": "carouselImg4.jpg"},
        ],
        goodsList: [],
        categoryFilter: [],
        categoryChecked: 'all',
        sortChecked: 'default',
        page: {
          current: 1,
          size: 8,
          total: 0
        },
        filterBy: false,
        overLayFlag: false,
        dec:0,
      }
    },
    components: {
      NavBread,
      Navheader,
      Navfooter
    },
    mounted: function () {
      this.getGoodsList();
      this.getCategoryList();
    },
    methods: {
      //获取商品列表
      getGoodsList() {
        let url = "/api/product?current=" + this.page.current + "&size=" + this.page.size;
        axios.get(url).then((result) => {
          let res = result.data.data;
          this.goodsList = res.records;
          this.page.total = res.total;
        });
      },
      //获取分页列表
      getCategoryList() {
        axios.get('/api/category').then((result) => {
          let res = result.data.data;
          this.categoryFilter = res.records;
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
      //修改当前分类
      setCategoryFilter(cid) {
        this.categoryChecked = cid;
        this.closePop();
        this.page.current = 1;
        axios.get('/api/product/category?cid=' + cid + "&current=" + this.page.current + "&size=" + this.page.size).then((result) => {
          let res = result.data.data;
          this.goodsList = res.records;
          this.page.total = res.total;
        });
      },
      checkedAll() {
        this.categoryChecked = 'all';
        this.getGoodsList();
      },
      gotoDetail(pid) {
        //通过push进行跳转
        this.$router.push(`/detail?pid=${pid}`)
      },

      //分页点击事件
      currentChange(current) {
        console.log(current);
        this.page.current = current;
        this.getGoodsList();
      },

      //根据价格排序
      sortByPrice() {
        this.sortChecked = "price";
        return this.sortKey(this.goodsList, 'price')
      },
      //根据时间排序
      sortByTime(){
        this.sortChecked = "time";
        return this.sortKey(this.goodsList, 'pdate')
      },
      //排序函数
      sortKey(array, key) {
        this.dec = this.dec+1;
        if (this.dec%2===0){
          return array.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            return ((x < y) ? -1 : (x > y) ? 1 : 0)
          })
        } else {
          return array.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            return ((x > y) ? -1 : (x < y) ? 1 : 0)
          })
        }
      },


      //加入购物车事件
      addCartList(pid) {
        if (this.$store.state.user.uid) {
          let order = {pid: pid, uid: this.$store.state.user.uid, number: 1, ordered: 0};
          axios.post("/api/orders/addcart", order).then((result) => {
            console.log(result);
            if (result.data === "") {
              axios.post("/api/orders", order)
            } else {
              order.number = result.data.number + 1;
              order.oid = result.data.oid;
              axios.put("/api/orders", order)
            }
            this.$message.success('加入购物车成功')
          })
        } else {
          this.$message.error('你还没有登录，请先登录！')
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .el-pagination {
    margin-top: 50px;
    padding: 0 40%;
  }

  .el-carousel {
    margin-top: 20px;

    .carouselImg {
      width: 100%;
      height: 100%;
    }
  }
</style>
