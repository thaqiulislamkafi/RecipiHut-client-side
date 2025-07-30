import React, { use } from 'react';
import Banner from './Banner';
import { Link, useLoaderData } from 'react-router';
import TopRecipe from '../TopRecipe';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from '../Provider/AuthProvider';


const Body = () => {

  const topRecipes = useLoaderData();

 

  return (
    <div>
      <Banner />


      <div className='w-[85.94vw] mx-auto sora-font my-15 '>


        <p className='text-center text-3xl poppins font-bold' >Top Recipe</p>

        <Fade>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 dark:bg-gray-800 bg-white'>
            {
              topRecipes.map(recipe => <TopRecipe recipe={recipe}></TopRecipe>)

            }
          </div>
        </Fade>

        <div className='flex justify-center '>
          <Link to={'/allRecipe'}><button className='btn'>View All</button></Link>
        </div>
      </div>

      <Fade cascade>
        <RecipeFAQSection />
      </Fade>

      <Fade>
        <NewsletterSubscribe />
      </Fade>

    </div>
  );
};

export default Body;

const NewsletterSubscribe = () => {

  const { darkMode } = use(AuthContext);
  const blackLogo = 'https://i.postimg.cc/R0FMxb5w/Black-logo.png';
  const whiteLogo = 'https://i.postimg.cc/WbH87dpj/white-logo.png';
  
  return (
    <section className="">
      <div
        className="z-40 mailbox w-[85.94vw] mx-auto bg-gray-200 rounded-3xl px-7 py-10 lg:py-12 lg:px-20 flex flex-col lg:flex-row gap-5 justify-between items-center lg:-mb-48 -mb-64 relative sora-font dark:bg-gray-700 "
      >
        <div className="image">
          <img
            className="w-[220px] lg:w-[330px] h-auto"
            src={darkMode ? whiteLogo : blackLogo}
            alt="Vegetable basket"
          />
        </div>
        <div className="description text-center lg:text-left">
          <h2 className="font-bold lg:font-semibold text-xl lg:text-3xl text-accentcolor lg:text-black dark:text-white">
            Give Feedback !
          </h2>
          <p className="text-base lg:text-lg my-4">
            Share your opinion to us to improve our rendering services
          </p>
          <input
            type="text"
            placeholder="Enter Email"
            className="input input-ghost w-full max-w-xs bg-white "
          />
          <div className='my-3'>
            <textarea
              type="text"
              placeholder=""
              className="input input-ghost w-full max-w-xs bg-white"
            />
          </div>
          <div className="btn mt-3">
            <button className="my-5 bg-accentcolor  text-sm py-2 px-7 rounded-lg ">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const RecipeFAQSection = () => {
  return (
    <section className="py-[70px] lg:py-[80px] w-[85.94vw] mx-auto lg:mb-28 sora-font dark:bg-gray-800 dark:text-gray-200">
      <p className="text-2xl font-semibold lg:text-3xl text-accentcolor mb-8">
        Frequently Asked Questions
      </p>
      <div className="asked bg-base-200 rounded-2xl lg:px-14 lg:py-20 dark:bg-gray-700 dark:text-gray-200">
        <div className="asked-container flex gap-6 flex-col p-3 lg:p-0 lg:flex-row lg:justify-between">
          <div className="asked-title p-5 lg:ml-6">
            <img
              className="w-[250px] mx-auto lg:w-[350px]"
              src="https://i.postimg.cc/W4qy6W7k/Frame.png"
              alt="Event tracking illustration"
            />
          </div>
          <div className="asked-accordion space-y-2 lg:space-y-5 max-w-[600px] ">
            {/* FAQ Item 1 */}
            <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-sm lg:text-lg font-medium">
                What is the best way to store fresh herbs to keep them fresh longer?
              </div>
              <div className="collapse-content text-xs lg:text-sm">
                <p>
                  To keep fresh herbs like basil, cilantro, or parsley fresh longer, trim the stems, place them in a jar with an inch of water (like a bouquet), cover loosely with a plastic bag, and store in the refrigerator. Alternatively, you can wrap them in a damp paper towel and store them in a sealed container.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm lg:text-lg font-medium">
                How can I thicken a soup or sauce without using flour?
              </div>
              <div className="collapse-content text-xs lg:text-sm">
                <p>
                  You can thicken soups or sauces by blending in cooked potatoes, lentils, or beans, using cornstarch (mixed with cold water first), or reducing the liquid by simmering uncovered. Another option is adding pureed vegetables like cauliflower or carrots.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm lg:text-lg font-medium">
                Why is my homemade bread dense and heavy?
              </div>
              <div className="collapse-content text-xs lg:text-sm">
                <p>
                  Dense bread can result from over-kneading (developing too much gluten), using old or inactive yeast, not letting the dough rise long enough, or measuring flour incorrectly (packing it into the cup instead of spooning it lightly). Try using a kitchen scale for precise measurements and allowing proper rising time.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm lg:text-lg font-medium">
                How do I prevent my cookies from spreading too much while baking?
              </div>
              <div className="collapse-content text-xs lg:text-sm">
                <p>
                  To prevent cookies from spreading too much, make sure your butter is at the right temperature (cool but softened, not melted), chill the dough for at least 30 minutes before baking, use parchment paper, and avoid overcrowding the baking sheet. Also, check that your baking soda or powder isn’t expired.
                </p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm lg:text-lg font-medium">
                What’s the secret to making fluffy scrambled eggs?
              </div>
              <div className="collapse-content text-xs lg:text-sm">
                <p>
                  For fluffy scrambled eggs, whisk them well with a splash of milk or cream, cook over low to medium heat while stirring gently, and remove them from the pan just before they’re fully set (they’ll continue cooking from residual heat). Adding a small amount of butter while cooking also enhances texture.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
