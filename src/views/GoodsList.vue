<template>
  <div>
    <navheader/>
    <nav-bread><span slot="bread">Goods</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortByPrice" class="price">Price
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
              <dt>类别:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':categoryChecked=='all'}" @click="checkedAll">All</a>
              </dd>
              <dd v-for="(category,index) in categoryFilter">
                <a href="javascript:void(0)" @click="setCategoryFilter(category.cid)"
                   :class="{'cur':categoryChecked==category.cid}">{{category.cname}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a @click="gotoDetail"><img :src="'/static/'+item.pimg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.pname}}</div>
                    <div class="price">{{item.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" @click="addCartList(item.pid)" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-sizes="page.size"
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

  export default {
    data() {
      return {
        goodsList: [],
        categoryFilter: [],
        categoryChecked: 'all',
        page: {
          current: 1,
          size: 8,
          total: 0
        },
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
      gotoDetail() {
        //通过push进行跳转
        this.$router.push('/detail')
      },

      //分页点击事件
      currentChange(current) {
        console.log(current);
        this.page.current = current;
        this.getGoodsList();
      },

      //根据价格排序
      sortByPrice() {
        return this.sortKey(this.goodsList, 'price')
      },
      //排序函数
      sortKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : (x > y) ? 1 : 0)
        })
      },

      //加入购物车事件
      addCartList(pid) {
        if (this.$store.state.user.uid) {
          let order = {};
          order.pid = pid;
          order.uid = this.$store.state.user.uid;
          order.number = 1;
          order.ordered = 0;
          axios.post("/api/orders",order).then((result) => {
            console.log(result);
            this.$message.success('加入购物车成功')
          })
        } else {
          this.$message.error('你还没有登录，请先登录！')
        }
      }
    }
  }
</script>
<style scoped>
  .el-pagination {
    padding: 0 40%;
  }
</style>
