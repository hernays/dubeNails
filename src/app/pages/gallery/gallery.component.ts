import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
   public images : string[] = [];
  constructor(
  ) { }

  ngOnInit(): void {
    this.images = this.collectionsNails();
  }

  collectionsNails(){
    const img:any[any] = {
      general:[
       'https://media.istockphoto.com/photos/womans-hands-with-ideal-manicure-in-trendy-neon-colors-on-white-picture-id1174913731?k=20&m=1174913731&s=612x612&w=0&h=yCwMkSP7sJyLlxqgfliZB5FdXpzg0AVv7PJ4ObQURkc=',
       'https://media.istockphoto.com/photos/female-hand-beautiful-nail-manicure-picture-id1204694573?k=20&m=1204694573&s=612x612&w=0&h=K2E5OLMvYI-76JdZX8Tog5Z3HeLBD-ozXymEEVTtjEI=',
       'https://i.pinimg.com/736x/9e/13/0c/9e130c962a4cc1ba4ab00e6750444b22.jpg',
       'https://i.pinimg.com/736x/f3/55/2d/f3552d35a044ecd0ffdfe40379e54dac.jpg',
       'https://i.pinimg.com/736x/26/9a/ae/269aae313a7bf6da5030344b911ba766.jpg',
       'https://i.pinimg.com/736x/75/6a/38/756a3810edca718eeec503ecdfea9a0d.jpg',
       'https://i.pinimg.com/736x/17/94/95/179495437a5ad1829fd5564a10806121.jpg',
       'https://i.pinimg.com/736x/2e/a8/08/2ea80807f6bb5de09a9f98865c9a71c6.jpg'
      ],
      primavera:['https://i.pinimg.com/236x/17/ed/3c/17ed3c7dec1ddd9a6a850e8d2a12ba41.jpg',
                 'https://i.pinimg.com/236x/74/c2/d5/74c2d5142c3b14ad90a40a9f31eaf5b5.jpg',
                 'https://i.pinimg.com/236x/7e/21/7e/7e217e0b642e6f79070177501541bdfa.jpg',
                 'https://i.pinimg.com/236x/2d/c6/ad/2dc6ad432061efbbee8c4465b9195d83.jpg',
                 'https://i.pinimg.com/236x/8a/04/89/8a04897020ba940e1cba0c2b8bacbcb9.jpg',
                 'https://i.pinimg.com/236x/ae/d2/a3/aed2a3b14e081f3f4bcb23b401c4102c.jpg',
                 'https://i.pinimg.com/236x/1d/79/3b/1d793b09219f6a61514381eeec5bddc3.jpg',
                 'https://i.pinimg.com/236x/c2/59/1b/c2591b5d21fa8dde7d3eeb96aa2cd1e5.jpg',
                 'https://i.pinimg.com/236x/66/03/2f/66032fcd56f3f049a59c7b226ddd5d53.jpg',
                 'https://i.pinimg.com/236x/8b/3e/2f/8b3e2fd2933dfeab4516a5fae04b884d.jpg',
                 'https://i.pinimg.com/236x/14/b3/86/14b38645cb35a19e73199ec994c2db6e.jpg',
                 'https://i.pinimg.com/236x/30/31/53/3031530cde4a74b7afaf3e0141fe21e1.jpg',
                 'https://i.pinimg.com/236x/65/4d/ed/654ded00dfe9a3ee2538b22289e2ed89.jpg',
                 'https://i.pinimg.com/236x/95/bc/4a/95bc4a311aa5c942dd5c9e83133bcaec.jpg',
                 'https://i.pinimg.com/236x/da/af/dd/daafdd637e9dbcde4f07001de5579485.jpg',
                 'https://i.pinimg.com/236x/0d/19/0d/0d190d93f7b881e35e9cc26a6498ba1a.jpg',
                 'https://i.pinimg.com/236x/c4/53/df/c453df99697dcb04034bfa64981dd417.jpg',
                 'https://i.pinimg.com/236x/59/8c/60/598c6046ceaf1141aa0d4a3a0490f6e9.jpg',
                 'https://i.pinimg.com/236x/71/a8/66/71a8669f07e2860d7ca52f34aabe8bea.jpg',
                 'https://i.pinimg.com/236x/7e/10/35/7e1035ae138e54782ab9da70dc9083a1.jpg',
                 'https://i.pinimg.com/236x/5d/a1/af/5da1af51b661542c7da6099fb6529097.jpg',
                 'https://i.pinimg.com/236x/b8/e9/a4/b8e9a49088bcb6e2cf54db2f254d95a8.jpg',
                 'https://i.pinimg.com/236x/e0/80/87/e08087625b5f016942681a3ca66b8d04.jpg'
               ],
      navidad:['https://i.pinimg.com/236x/da/03/7b/da037b38b9ae9c9933cedc2141f3b261.jpg',
               'https://i.pinimg.com/236x/de/ae/21/deae21811ec37deb5c757434dec018ab.jpg',
               'https://i.pinimg.com/236x/98/d2/30/98d23007bf437d533994bd1245b9bb7e.jpg',
               'https://i.pinimg.com/236x/65/a5/be/65a5be40e617902f7f5bad9db3951759.jpg',
               'https://i.pinimg.com/236x/0b/75/5f/0b755f652326768654a7346cc6fbc8ca.jpg',
               'https://i.pinimg.com/236x/c0/7a/5c/c07a5c753051fa2718a842a0a57a24d2.jpg',
               'https://i.pinimg.com/236x/de/a4/13/dea4130320cb2c274d550e46086a4f31.jpg',
               'https://i.pinimg.com/236x/e3/2b/d6/e32bd696712680ce954558b871da8859.jpg',
               'https://i.pinimg.com/236x/ca/37/a1/ca37a1f137d70c6f710e2caca43ef5c0.jpg',
               'https://i.pinimg.com/236x/87/3b/4d/873b4db8e4cac68283aa3cf44cd99c0f.jpg',
               'https://i.pinimg.com/236x/ec/8d/28/ec8d285552a8b144e05732183ea3cb1a.jpg',
               'https://i.pinimg.com/236x/5d/78/ba/5d78ba716e79be3fea015966ba79e442.jpg',
               'https://i.pinimg.com/236x/95/73/48/9573480e4dc5517ad3f684cbdc895876.jpg',
               'https://i.pinimg.com/236x/86/d8/40/86d840944d42c956ddeae46355d3ab16.jpg',
               'https://i.pinimg.com/236x/62/49/ef/6249efd3eeeef37fff0183d984332bd4.jpg',
               'https://i.pinimg.com/236x/8c/a2/11/8ca211f70bc47acc5f96f6ef67505aad.jpg',
               'https://i.pinimg.com/236x/f9/21/f3/f921f3f3bc03fb08130fdc65b2fa8a7d.jpg',
               'https://i.pinimg.com/236x/00/23/b6/0023b68497325bf28b5d21afe5d6d5ab.jpg',
               'https://i.pinimg.com/236x/74/14/49/74144924d8047d4b24a7cf59131a5f81.jpg',
               'https://i.pinimg.com/236x/78/60/c3/7860c3ec76bb71b17e8d6746824570f5.jpg',
               'https://i.pinimg.com/236x/18/45/05/184505593f867dd3f96ddae22d8dfae7.jpg',
               'https://i.pinimg.com/236x/18/c3/46/18c34699a7de2cebd650be9d73e0b8db.jpg',
               'https://i.pinimg.com/236x/db/36/62/db366216e265bb60130470136ff185d0.jpg',
     ]
    }

    let urlImg = [];
         for(let items in img){
              /* console.log(img[items]) */
              for(let imgUrl of img[items] ){
                urlImg.push(imgUrl);
              }
        }
      
     return urlImg;
    
  }

}
