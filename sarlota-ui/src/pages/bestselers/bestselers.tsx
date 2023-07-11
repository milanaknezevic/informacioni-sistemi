import "./bestselers.scss";
import { useState, useEffect } from "react";
import { api } from "../../api";
import Title from "antd/es/typography/Title";
import { Button, Empty, message, Segmented } from "antd";
import { Spinner } from "../../components/spinner";
import { RecipeCard } from "../../components/recipe";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export const BestselersPage: React.FunctionComponent = () => {
  const [bestseleri, setBestseleri] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const defaultImg =
    "https://images.pexels.com/photos/265801/pexels-photo-265801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const getBestselers = async () => {
    setLoading(true);
    const response = await api.statistike.getBestseleri();
    const responseData = await response.json();
    setBestseleri(responseData);
    setLoading(false);
    console.log("bestseleri", responseData);
    responseData.forEach((bestseler: any) => {
      console.log("slika ", bestseler.slika);
      // Dodatna logika za prikazivanje slike
    });
  };

  useEffect(() => {
    getBestselers();
    console.log("best", bestseleri);
  }, []);

  return (
    <div className="recipes">
      <div className="recipes__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Top 5 najprodavanijih proizvoda
        </Title>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="recipes__content">
          {bestseleri?.length > 0 ? (
            <div className="pomoc">
              {bestseleri?.slice(0, 5).map((recipe) => (
                <div>
                  <Card
                    style={{
                      width: 300,
                      height: 350,
                      padding: "30px",
                      marginBottom: "10px",
                    }}
                    cover={
                      <img
                        alt="example"
                        src={recipe.slika !== "" ? recipe.slika : defaultImg}
                        height={250}
                      />
                    }
                  >
                    <div className="recipe">
                      <Meta title={recipe.naziv} className={"recipe__title"} />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              description="Nisu pronađeni recepti"
              style={{ margin: "auto", marginTop: "20vh" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
