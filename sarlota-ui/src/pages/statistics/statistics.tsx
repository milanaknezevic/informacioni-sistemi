import "./statistics.scss";

import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/user.context";
import { useEffect, useRef, useState } from "react";
import AreaChartComponent from "../../components/area-chart/area-chats";
import Details from "./details/details";

import StatisticCard from "../../components/statistic-card/statistic-card";
import PieChartComponent from "../../components/pie/pie";
import { api } from "../../api";
import { ExportOutlined } from "@ant-design/icons";

import { PDFExport } from "@progress/kendo-react-pdf";

const { Title } = Typography;

const initialDays = "7";

export const StatisticsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [numOfDays, setNumOfDays] = useState(initialDays);
  const [naslov, setNaslov] = useState("");
  const [numOfOrders, setNumOfOrders] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [troskovi, setTroskovi] = useState(false);
  const [incomeData, setIncomeData] = useState<any[]>([]);

  const [grupisaneNarudzbe, setGrupisaneNarudzbe] = useState<any[]>([]);
  const [podaci, setPodaci] = useState<any[]>([]);
  const [potrosnjaNarudzbe, setPotrosnjaNarudzbe] = useState<any[]>([]);
  const [expenditureData, setExpenditureData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pdfExportComponent = useRef<PDFExport>(null);

  const getNumOfOrders = async () => {
    const response = await api.statistike.getNumOfOrders(numOfDays);
    const responseData = await response.json();
    setNumOfOrders(responseData);
  };

  const getTotalIncome = async () => {
    const response = await api.statistike.getTotalIncome(numOfDays);
    const responseData = await response.json();
    setTotalIncome(responseData);
  };

  const getIncomeStatistics = async () => {
    const response = await api.statistike.getIncome(numOfDays);
    const responseData = await response.json();
    setIncomeData(responseData);
    console.log("podaci", responseData);
  };
  const getPotrosnjaNarudzbe = async () => {
    const response = await api.statistike.getPotrosnjaNarudzbe(numOfDays);
    const responseData = await response.json();
    setPotrosnjaNarudzbe(responseData);
  };

  const getGrupisaneNarudzbe = async () => {
    const response = await api.statistike.getGrupisaneNarudzbe(numOfDays);
    const responseData = await response.json();
    setGrupisaneNarudzbe(responseData);
    console.log("podaci", responseData);
  };

  const getExpenditureStatistics = async () => {
    const response = await api.statistike.getExpenditure(numOfDays);
    const responseData = await response.json();
    setExpenditureData(responseData);
  };

  const changeGraphShow = (day: string) => {
    setNumOfDays(day);
  };

  const transformIncomeData = (data: any) => {
    const newData = data.map((elem: any) => ({
      datum: elem.datum,
      zarada: parseInt(elem.zarada),
    }));
    return newData;
  };

  const exportReport = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //setPodaci([]);
  };

  useEffect(() => {
    user?.tipZaposlenog === "POSLASTICAR"
      ? console.log("fetch statistics")
      : navigate("/admin/pregled");
    getNumOfOrders();
    getTotalIncome();
    getIncomeStatistics();
    getGrupisaneNarudzbe();
    getPotrosnjaNarudzbe();
    getExpenditureStatistics();
  }, [numOfDays, podaci]);

  const prikaziAnalizuZarade = () => {
    console.log("prikazi analizu zarade");
    setIsModalOpen(true);
    setPodaci(grupisaneNarudzbe);
    if (numOfDays === "1") {
      const naslovText = `Analiza prodaje za ${numOfDays} dan`;
      setNaslov(naslovText);
    } else {
      const naslovText = `Analiza prodaje za ${numOfDays} dana`;
      setNaslov(naslovText);
    }
    setTroskovi(false);
  };
  const prikaziTroskove = () => {
    setIsModalOpen(true);
    setPodaci(potrosnjaNarudzbe);
    console.log("prikazi troskoveeeeeeeeeeeeeeeeeeeeeee", podaci);
    console.log("potrosnjaNarudzbe", potrosnjaNarudzbe);
    setTroskovi(true);
    if (numOfDays === "1") {
      const naslovText = `Troškovi proizvodnje za ${numOfDays} dan`;
      setNaslov(naslovText);
    } else {
      const naslovText = `Troškovi proizvodnje za ${numOfDays} dana`;
      setNaslov(naslovText);
    }
  };
  return (
    <PDFExport ref={pdfExportComponent} paperSize="A1" landscape>
      <div className="content">
        <Title level={3} className="content__title">
          Statistika za {numOfDays} {numOfDays === "1" ? "dan" : "dana"}
        </Title>
        <div className="content__report">
          <Button
            type="primary"
            onClick={exportReport}
            icon={<ExportOutlined />}
          >
            EKSPORTUJ
          </Button>
        </div>
        <div className="content__links">
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("1");
            }}
          >
            1 dan
          </Button>
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("7");
            }}
          >
            7 dana
          </Button>
          <Button
            type="text"
            onClick={() => {
              changeGraphShow("30");
            }}
          >
            30 dana
          </Button>
        </div>
        <div className="content__orders">
          <AreaChartComponent
            title={"Zarada"}
            data={incomeData}
            date={"datum"}
            value={"zarada"}
            width={1007}
            height={270}
            color="#3861ED"
          />
          {/* {numOfDays === "1" && (
          <PieChartComponent key={"zarada"} data={data}></PieChartComponent>
           )} */}

          <StatisticCard
            title={"Ukupna zarada [KM]"}
            value={totalIncome}
            precision={2}
          />
        </div>
        <button className="details" onClick={prikaziAnalizuZarade}>
          Više detalja
        </button>
        {isModalOpen && (
          <Details
            troskovi={troskovi}
            value={podaci}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            naslov={naslov}
          />
        )}
        <div className="content__orders">
          <AreaChartComponent
            title={"Potrosnja"}
            data={expenditureData}
            date={"datum"}
            value={"potrosnja"}
            width={1007}
            height={270}
            color="#3861ED"
          ></AreaChartComponent>
          <StatisticCard
            title={"Broj narudzbi"}
            value={numOfOrders}
            precision={0}
          />
        </div>
        <button className="details" onClick={prikaziTroskove}>
          Više detalja
        </button>
        {isModalOpen && (
          <Details
            value={podaci}
            troskovi={troskovi}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            naslov={naslov}
          />
        )}
      </div>
    </PDFExport>
  );
};
