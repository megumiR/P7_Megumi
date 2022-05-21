
<template>
<div class="col">
    <div class="card shadow-sm mt-4 h-100">
        <img class="card-img-to" :src="image" alt="image" v-if="image"/>
        <div class="card-body">
            <h3 class="card-title"> {{ title }}</h3>
            <p class="card-texte"> 
                {{ content }}  
            </p>
            
        </div>
        <div class="card-footer p-4">
            <div class="row">
            <div class="col" v-if="userId == authorId || this.$store.getters.rollAdmin == 'admin'">
                <router-link :to="`/update/${postId}`" class="btn btn-primary" > modifier ce post <span id="postId">{{postId}}</span> </router-link> 
                <router-view />
            </div>
            <router-link :to="`/onepost/${postId}`" class="col d-flex justify-content-around align-items-center text-decoration-none">
                <i class="far fa-thumbs-up fa-lg "></i>
                <i class="fas fa-thumbs-down fa-lg" ></i>
            </router-link>
            </div>
        </div>
    </div>    
</div>     
    <!--
    <div class="shadow-sm PostCard">
        <div class="PostCard__img"> 

            <img class="PostCard__img--form" :src="image" alt="image" v-if="image"/>
        </div>    
        <div class="PostCard__textblock">
            <p> 
                Title : {{ title }}
                <br/> 
                {{ content }}  
            </p>
            

            <div class="PostCard__button" v-if="userId == authorId || this.$store.getters.rollAdmin == 'admin'">
                <div class="PostCard__button--form" >
                    <router-link :to="`/update/${postId}`" > modifier ce post <span id="postId">{{postId}}</span> </router-link> 
                </div>  
                <router-view />
            </div>

            <router-link :to="`/onepost/${postId}`" >
                <div class="PostCard__iconblock">
                    <div class="PostCard--icon PostCard--iconmargin">
                            <i class="far fa-heart fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                    </div>
                    <div class="PostCard--icon PostCard--iconmargin">
                            <i class="fas fa-thumbs-down fa-lg PostCard--iconposition PostCard--iconNocolor"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>!-->
</template>

<script>

export default {
  name: 'PostCard',   
  emits: ['emitname'], //emit is not working
  created() {
      this.$emit('emitname', 'Touts les posts sont affichés ') //+親template に<子部品名 @emitname="(e)=>dataReturnFromParent=e"> , data(){return{dataReturnFromParent: xxxで反映
  },
  props: [ 'image', 'content', 'title', 'authorId', 'postId' ], //''内にTemplate上で{{}}書きした名前
  //またはprops:{msg:String}/親部品中でGetリクエストの内容を反映する/<子部品名:msg="xxx--親のdata(){return{xxx:""}"
  data: function () {
      return {
          userId: localStorage.getItem('userID'),  
          roll: '',
      }
  },
  methods : {
  }     
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
