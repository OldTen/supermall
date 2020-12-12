<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
          <div class="header-title">用户评论</div>
          <div class="header-more">
              更多
              <i class="arrpw-right"></i>
          </div>
      </div>
      <div class="info-user">
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
          <p>{{commentInfo.content}}</p>
          <div class="info-other">
              <!-- <span class="date">{{commentInfo.created}}</span> -->
              <span class="date">{{showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
      </div>
      <div class="info-imgs">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
    name:"DetailCommentInfo",
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showDate(){
            let date = new Date(this.commentInfo.created *1000);
            return formatDate(date, 'yyyy-MM-dd')
        }
    }
}
</script>

<style scoped>
.comment-info{
    position: relative;
    margin: 15px 8px 5px 8px;
    overflow: hidden;
    border-bottom: rgba(147, 149, 152,.3) 2px solid;
    padding-bottom: 15px;
}
.comment-info img{
    width: 100%;
}
.info-header{
    height: 40px;
    line-height: 39px;
    margin-bottom: 8px;
    border-bottom: rgba(147, 149, 152,.3) 1px solid;
}
.info-header .header-title{
    float: left;
}
.info-header .header-more{
    float: right;
}
.info-header .arrpw-right{

}
.info-user{
    position: relative;
}
.info-user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    
}
.info-user span{
    position: relative;
    left: 5px;
    top: -10px;
}
.info-detail{
   
}
.info-detail p{
    font-size: 14px;
    padding: 8px 0;
    line-height: 1.5;
}
.info-other{
    padding: 5px 0;
    color: lightslategrey;
    font-size: 13px;
}
.info-other .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>