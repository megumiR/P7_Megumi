<template>
    <div class="PostCard">
            <!-- v-bind for API
             <div class="PostCard" v-for="post in posts"
                    v-bind:key="post.id"
                    v-bind:title="post.title"
                    v-bind:comment="post.comment"
            >
                    {{ post.postComment }}
            </div>
            -->
        <div class="PostCard__img"> 
<!--            <img :src="imageUrl" :alt="imageAlt" />    
-->
            <img :src="image" alt="image" />
        </div>    
        <div>
            <p>
                {{ postComment }} <br/>

                [ Comment par {{ postName }} ] 
            </p>
            
            <div class="PostCard__button">
                <div class="update PostCard__button--form" id="update" v-if="utilisateurId">
                    <router-link to="/update" > Modifier </router-link> 
                </div>  
                <router-view />


                <div class="delete PostCard__button--form" id="delete">Supprimer</div> 
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
export default {
  name: 'PostCard',
  props: [
       'image', 'postName', 'postComment'
  ],
  data: function () {
      return {
          numberOfLikes : 0,
          numberOfDislikes : 0
      }
  },
  methods : {
      increment: function () {
          this.numberOfLikes++;
      },
      incrementDislike: function () {
          this.numberOfDislikes++;
      }
  } 
}
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
     //   display: none;  //s'il n'y a pas d'image

        max-height: 30em;
        
        margin: 5px 0;
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
</style>
