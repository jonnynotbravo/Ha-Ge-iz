import Header from "./Header";

const SchoolsList = () => {
  return (
    <div>
      <Header />
      <main>
        <ul id="cards">
          <li className="card" id="card_1">
            <div className="card__content">
              <div>
                <h2>El Bethel Academy</h2>
                <p>"The name of the lord is the begninning of wisdom"</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Todd_Street_school.jpg/640px-Todd_Street_school.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content">
              <div>
                <h2>Falcon Acadmey</h2>
                <p>"The stupidest school ever"</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://images.alphacoders.com/105/thumb-1920-105131.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content">
              <div>
                <h2>Addis Anba</h2>
                <p>"I don't know what to write"</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://www.sdb.k12.wi.us/cms/lib/WI01919658/Centricity/Domain/302/Gaston_Building_2.jpg"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content">
              <div>
                <h2>School of Aygoda</h2>
                <p>baluan metakatelewa mist temerbet</p>
                <p>
                  <a href="#top" className="btn btn--accent">
                    Read more
                  </a>
                </p>
              </div>
              <figure>
                <img
                  src="https://pbs.twimg.com/media/E7zsLtSXoAIiJB5?format=jpg&name=4096x4096"
                  alt="Image description"
                />
              </figure>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default SchoolsList;
