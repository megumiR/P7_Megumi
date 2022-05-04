
<template>
    <div class="PostCard">
        <div class="PostCard__img"> 

            <img class="PostCard__img--form" :src="image" alt="image" v-if="image"/>
        </div>    
        <div class="PostCard__textblock">
            <p> 
                Title : {{ title }} <span id="postId" class="hide">postId:{{postId}}</span> <span id="authorId" class="hide">by authorId:{{ authorId }}</span>
                <br/> 
                {{ content }}  
            </p>
            

            <div class="PostCard__button" v-if="userId == authorId">
                <div class="update PostCard__button--form" id="noMatch" @click="postToUpdate">
                    <router-link to="/update" > Modifier </router-link> 
                </div>  
                <router-view />



                <div class="delete PostCard__button--form" id="noMatch"  @click.prevent="postToDelete">Supprimer</div> 
            </div>

            <div class="PostCard__iconblock">
                <div class="PostCard--icon PostCard--iconmargin">
                        <i class="far fa-heart fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                        <i class="fas fa-heart fa-lg PostCard--iconposition PostCard--iconcolor" @click="increment()"></i>
                        <div>{{ numberOfLikes }}</div>
                </div>
                <div class="PostCard--icon PostCard--iconmargin">
                        <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                        <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconcolor" @click="incrementDislike()"></i>
                        <div>{{ numberOfDislikes }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import { mapState } from "vuex"

export default {
  name: 'PostCard',   
  emits: ['emitname'], //emit is not working
  created() {
      this.$emit('emitname', 'Touts les posts sont affichés ') //+親template に<子部品名 @emitname="(e)=>dataReturnFromParent=e"> , data(){return{dataReturnFromParent: xxxで反映
  },
  props: [ 'image', 'content', 'title', 'authorId', 'postId' ], //''内にTemplate上で{{}}書きした名前
/*props: { 
    image: ,
    content: String,
    title: String
},  //またはprops:{msg:String}/親部品中でGetリクエストの内容を反映する/<子部品名:msg="xxx--親のdata(){return{xxx:""}"
*/  data: function () {
      return {
          numberOfLikes : 0,
          numberOfDislikes : 0,
          userId: localStorage.getItem('userID'),  
          roll: ''
      }
  },
/*  computed: {
    ...mapState({
      userName: 'userId'
    })
  },*/
  methods : {
      increment: function () {
        let reaction = JSON.parse(localStorage.getItem('reaction')); 
        console.log(isLiked);
        let isLiked = false;
        console.log(isLiked);

//        if (isLiked == userId) {
                 
          if (!isLiked) {
              console.log('liked doesnt exsist');
              isLiked = true;
              console.log('isLiked: ' +isLiked);
              this.numberOfLikes++;
              localStorage.setItem('reaction', JSON.stringify(reaction)); 
              console.log(reaction);
          } else if (isLiked == false) {
              console.log('isLiked == false');
          } else if (isLiked == true) {
              console.log('isLiked == true');
          }
        }
          /*
          let likePost = react.likePost;
          console.log(likePost);
          
          if (isReacted == true && likePost == true) {
            this.numberOfLikes--;
            reaction.push({ 'likePost' : 'false'});
            localStorage.setItem('reaction', reaction); 
          } else if (isReacted == true && likePost == false) {
            this.numberOfLikes++;
            reaction.push({ 'likePost' : 'true'});
            localStorage.setItem('reaction', reaction); 
          } else {
            isReacted = false; 
          }
*/
      },
      incrementDislike: function () {
        this.numberOfDislikes++;
       // this.numberOfDislikes = 'counté';
      },
      postToUpdate: function() {
       // this.$emit('postToUpdate');
        console.log('postcard');
      //  this.mode = ;
        // get the post id and send infos to the UpdateView.vue
      },
      postToDelete: function() {
      }
  }     
//}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.PostCard{
    width: 90%;
    min-height: 5em;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    
    margin: 15px 0;
    padding-bottom: 50px;
    border: solid #ebebeb;

    &__img{
        max-height: 15em;
        max-width: 28em;
        align-self: flex-end;
        &--form{
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &__textblock{
        position: relative;
        bottom: -4em;
        right: -1em;
    }
    &__button{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;

        margin: 10px 0;
        
        &--form{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2em;
            width: 6em;

            margin: 0 5px;
            background-color: #ebebeb;
        }
    }
    &__iconblock{
        width: 65%;
        display: flex;
        flex-direction: row;
    }
    &--iconmargin{
        margin-left: auto;
    }
    &--icon{
        display: flex;
        justify-content: center;
        align-content: center;

        /*position exactry the same place*/
        position: relative;
        height: 45px;

        transition: transform 500ms ease-out;
        &:hover{
            cursor: pointer;
            transform: scale(1.2);
        }
    }
    &--iconposition{
        position: absolute;
        right: 1rem;  
        @media all and (max-width:370px) {
            right: unset;
        }
    }
    &--iconNocolor{
       /* transform-origin: center;*/
       /* transform: scale(1);*/       
        transition: opacity 350ms 100ms;
        &:hover{
            transform: scale(1.2);
            opacity: 0;
        }
    }
    &--iconcolor{
        opacity: 0;
        color: #ff4911;
        transition: opacity 1000ms ease-in 40ms;
        &:hover{
            opacity: 0.8;
           
        }
    }

}
.hide {
    color: red;
  //  opacity: 0;
}
</style>
