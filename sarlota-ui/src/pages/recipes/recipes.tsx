// Libs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Ant
import { Button, Empty, message, Segmented } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import { SegmentedValue } from "antd/es/segmented";

// Components
import { Spinner } from "../../components/spinner";
import { RecipeDrawer } from "../../features/recipe-drawer";
import { RecipeCard } from "../../components/recipe";

// Assets
import { FileTextOutlined } from "@ant-design/icons";

import { api } from "../../api";

import "./recipes.scss";
import { Recipe } from "../../api/services/recipes.service";

export const RecipesPage: React.FunctionComponent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null | undefined>(
    null
  );
  const [showNewRecipeDrawer, setShowNewRecipeDrawer] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchRecipes = async () => {
    setLoading(true);
    const response = await api.recepti.fetchRecipes();
    const data = await response.json();
    setRecipes(data);
    setLoading(false);

    console.log("recpeti", data);
  };

  const onNewRecipeClick = () => {
    setRecipeToEdit(null);
    setShowNewRecipeDrawer(true);
  };

  const onDrawerClose = () => {
    setShowNewRecipeDrawer(false);
    setRecipeToEdit(null);
    fetchRecipes();
  };

  const onRecipeDetails = (id: number) => {
    navigate(`./${id}`);
  };

  const onToggleFavorite = async (id: number) => {
    await api.recepti.toggleFavorite(id);
    const index = recipes.findIndex((recipe) => recipe.id === id);
    let recipesUpdated = [...recipes];
    recipesUpdated[index].omiljeni = !recipesUpdated[index].omiljeni;

    setRecipes(recipesUpdated);
  };

  const onRecipeDelete = async (id: number) => {
    const response = await api.recepti.deleteRecipe(id);

    if (response.status === 200) {
      messageApi.open({
        type: "success",
        content: "Recept je uspješno obrisan!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Došlo je do greške.",
      });
    }

    setRefresh((is) => !is);
  };

  const onRecipeEdit = (recipe: Recipe) => {
    setRecipeToEdit(recipe);
    setShowNewRecipeDrawer(true);
  };

  const onSearch = async (value: string) => {
    if (value === "") {
      fetchRecipes();
    } else {
      const response = await api.recepti.searchRecipes(value);
      const data = await response.json();
      setRecipes(data);
    }
  };

  const onRecipesFilterChange = async (value: SegmentedValue) => {
    if (value === "Svi recepti") {
      fetchRecipes();
    } else {
      setRecipes(recipes.filter((recipe) => recipe.omiljeni === true));
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [refresh]);

  return (
    <div className="recipes">
      {contextHolder}

      <RecipeDrawer
        open={showNewRecipeDrawer}
        recipe={recipeToEdit}
        onClose={onDrawerClose}
      />

      <div className="recipes__header">
        <Title level={3} style={{ marginTop: 0 }}>
          Recepti
        </Title>

        {/* @ts-ignore */}
        <Segmented
          options={["Svi recepti", "Omiljeni recepti"]}
          style={{ height: "32px" }}
          onChange={onRecipesFilterChange}
        />
        <div className="recipes__header__actions">
          <Button
            type="primary"
            size="large"
            icon={<FileTextOutlined />}
            onClick={onNewRecipeClick}
          >
            Dodaj novi recept
          </Button>
          <Search
            className="recipes__header__actions__search"
            placeholder="Pretraži recepte"
            allowClear
            enterButton="Pretraga"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="recipes__content">
          {recipes?.length > 0 ? (
            recipes?.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                onDeleteClick={onRecipeDelete}
                onEditClick={onRecipeEdit}
                onDetailsClick={onRecipeDetails}
                onToggleFavoriteClick={onToggleFavorite}
              />
            ))
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
