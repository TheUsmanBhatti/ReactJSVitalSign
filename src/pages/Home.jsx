import React from 'react'
import '../styles/home.scss'

import vg from '../assets/vector-image.png';

import {
  AiFillGoogleCircle,
  AiFillAmazonCircle,
  AiFillYoutube,
  AiFillInstagram
} from 'react-icons/ai'

export default function Home() {
  return (
    <>
      <div className='home' id='home'>
        <main>
          <h1>TechyStar</h1>
          <p>Solution to all your problems</p>
        </main>
      </div>

      <div className="home2">
        <img src={vg} alt="Graphic" />

        <div>
          <p>
            Looking for a PRO Service? Want a neat and high-quality design for your Church events or Any social events or Business? Need a fast turn around? Looking for an artist who can interpret your vision without stress? IF YES, Then SEARCH NO MORE! because this gig is for you!
          </p>
        </div>

      </div>


      <div className="home3" id='about'>
        <div>
          <h1>Who we are?</h1>
          <p>
            Lorem ipsum dolor sit amet. Ex molestiae itaque et repudiandae praesentium et excepturi sint ut quia vero sed laboriosam amet. Ut expedita autem qui possimus mollitia et voluptas quam et nisi soluta et sequi molestiae ut rerum commodi sed exercitationem voluptatem. Ea adipisci fuga et accusamus voluptas sit molestiae reprehenderit ut vero totam non rerum molestiae ad provident ullam rem vero reiciendis. At ratione doloremque ut aliquid repellat ut similique voluptate.

            Aut sequi nisi non ipsa adipisci qui laborum perferendis ut quas libero! Quo tempora repudiandae non dolorum aperiam nam corrupti atque
          </p>
        </div>
      </div>

      <div className="home4" id='brands'>
        <div>
          <h1>Brands</h1>

          <article>
            <div style={{animationDelay: "0.3s"}}>
              <AiFillGoogleCircle/>
              <p>Google</p>
            </div>

            <div style={{animationDelay: "0.5s"}}>
              <AiFillAmazonCircle/>
              <p>Amazon</p>
            </div>

            <div style={{animationDelay: "0.7s"}}>
              <AiFillYoutube/>
              <p>Youtube</p>
            </div>

            <div style={{animationDelay: "1s"}}>
              <AiFillInstagram/>
              <p>Instagram</p>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
