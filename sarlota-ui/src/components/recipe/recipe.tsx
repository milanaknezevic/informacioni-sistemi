import { Button, Card, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

import { Recipe } from "../../api/services/recipes.service";

import "./recipe.scss";

const defaultImg =
  "https://foodhub.scene7.com/is/image/woolworthsltdprod/2209-easy-choc-crunch-cake:Mobile-1300x1150";

interface RecipeCardProps {
  recipe: Recipe;
  onDetailsClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onEditClick: (recipe: Recipe) => void;
  onToggleFavoriteClick: (id: number) => void;
}

export const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({
  recipe,
  onDeleteClick,
  onDetailsClick,
  onEditClick,
  onToggleFavoriteClick,
}) => {
  const onDetails = () => {
    onDetailsClick(recipe.id);
  };

  const onEdit = () => {
    onEditClick(recipe);
  };

  const onDelete = () => {
    onDeleteClick(recipe.id);
  };

  const onToggleFavorites = () => {
    onToggleFavoriteClick(recipe.id);
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={recipe.fotografija !== "" ? recipe.fotografija : defaultImg}
          height={200}
        />
      }
      actions={[
        <Tooltip title="Recept" placement="bottom">
          <BookOutlined key="details" onClick={onDetails} />
        </Tooltip>,
        // <Tooltip title="Izmjena" placement="bottom">
        //   <EditOutlined key="edit" onClick={onEdit} />
        // </Tooltip>,
        <Tooltip title="Brisanje" placement="bottom">
          <Popconfirm
            title="Obriši recept"
            description="Da li ste sigurni da želite obrisati recept?"
            onConfirm={onDelete}
            onCancel={() => {}}
            okText="Potvrdi"
            cancelText="Poništi"
          >
            <DeleteOutlined key="brisanje" />
          </Popconfirm>
        </Tooltip>,
      ]}
    >
      <div className="recipe">
        <Meta title={recipe.naslov} className={"recipe__title"} />
        <Button
          type="ghost"
          shape="circle"
          size="large"
          icon={
            recipe.omiljeni ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined style={{ color: "red" }} />
            )
          }
          className={"recipe__favorite"}
          onClick={onToggleFavorites}
        />
      </div>
    </Card>
  );
};
