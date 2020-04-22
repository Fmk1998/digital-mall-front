<template>
  <div>
    <el-backtop></el-backtop>
    <navheader/>
    <nav-bread><span slot="bread">商品详情</span></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container" v-for="(item,index) in goodsList">
        <div class="accessory-result">
          <!-- search result accessories list -->
          <div class="accessory-list-wrap detail">
            <div class="accessory-list ">
              <el-card class="box-card col-5">
                <el-carousel indicator-position="outside">
                  <el-carousel-item :key="item.pid">
                    <a @click="addCartList(item.pid)"><img class="bimg" :src="'/static/'+item.pimg" alt=""></a>
                  </el-carousel-item>
                </el-carousel>
                <el-collapse>
                  <el-collapse-item title="商品名" name="1">
                    <div class="el-col-p">{{item.pname}}</div>
                  </el-collapse-item>
                  <el-collapse-item title="商品价格" name="2">
                    <div class="el-col-p">{{item.price}}</div>
                  </el-collapse-item>
                  <el-collapse-item title="发售日期" name="3">
                    <div class="el-col-p">{{item.pdate}}</div>
                  </el-collapse-item>
                  <el-collapse-item title="商品详情" name="4">
                    <div class="el-col-p">{{item.pdetail}}</div>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
            </div>
          </div>
          <div class="accessory-list-wrap detail">
            <div class="accessory-list">
              <el-card class="box-card col-5">
                <div slot="header" class="clearfix">
                  <span>评论区</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="centerDialogVisible = true">添加评论</el-button>
                </div>
                <div class="todo" v-model="commentList">
                  <div v-for="o in commentList" :key="o.commentid" class="text item">
                    {{o.uname+'说：' + o.content }}
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <el-dialog
            title="说点什么吧"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="comment.content">
            </el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addComment">确 定</el-button>
  </span>
          </el-dialog>
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
  import {getUrlKey} from '../util/getUrlKey';
  import axios from 'axios'

  export default {
    data() {
      return {
        pid:'',
        centerDialogVisible: false,
        commentList:[],
        comment:{
          uname:this.$store.state.user.uname,
          content:'',
          pid:''
        },
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
      Navfooter,
    },
    mounted: function () {
      this.goodsList.pid = getUrlKey('pid');
      this.pid = getUrlKey('pid');
      this.comment.uname = this.$store.state.user.uname;
      this.getGoodsListDetail(this.pid);
      this.getGoodsComment(this.pid)
    },
    methods: {
      //获取商品信息
      async getGoodsListDetail(pid) {
        console.log(pid)
        let url = "/api/product?pid=" + pid;
        await axios.get(url).then((result) => {
          let res = result.data.data;
          this.goodsList = res.records;
          debugger
        });
      },
      //获取商品评论
      async getGoodsComment(pid) {
        console.log(pid)
        let url = "/api/comment/pcom?pid=" + pid;
        await axios.get(url).then((result) => {
          let res = result.data.data;
          this.commentList = res.records;
        });
      },
      //添加评论
      async addComment(){
        this.centerDialogVisible = false;
        this.comment.pid = this.pid;
        let uname = this.$store.state.user.uname;
        if(!uname) {
          return this.$message.error('你还没有登录，请先登录在评论！');
        }
        if(this.comment.content==="") {
          return this.$message.error('请输入你想评论的话！');
        }
        this.comment.uname = uname;
        await axios.post("/api/comment",this.comment).then((result)=>{
          let res = result.status;
          if (result.status===200) {
            this.$message.success('发布成功');
          } else {
            this.$message.error('发布失败');
          }
          this.getGoodsComment(this.pid);
          debugger
        })
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
<style scoped>
  .accessory-result-page {

  }

  .container {
    display: flex;
    justify-content: center;
  }

  .detail {
    margin-top: 30px;
  }

  .el-carousel__item {
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

  .el-col-p {
    font-size: 2em;
  }

  .todo {
    height: 465px;
    overflow: auto;
  }

  @media only screen and (max-width: 767px) {
    .accessory-result {
      display: inline;
    }

    .todo {
      height: 200px;
      overflow: auto;
    }
  }
</style>
