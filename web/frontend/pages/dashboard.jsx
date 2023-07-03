import { Button, Icon } from "@shopify/polaris";
import DatePicker from "../components/DashboardComponent/DatePicker";
import CompareDatePicker from "../components/DashboardComponent/CompareDatePicker";
import { useNavigate } from "react-router-dom";
import LineChart from "../components/DashboardComponent/LineChart";
import { CustomersMajor } from "@shopify/polaris-icons";

const dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dr-dashboard-page">
      <div className="dr-dashboard-heading-with-date-picker">
        <div className="dr-dashboard-heading">Dashbaord</div>
        <div className="dr-dashboard-date-picker">
          <DatePicker />
          <CompareDatePicker />
        </div>
      </div>
      <div className="line-chart-component">
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">No of Users</h2>
            </div>
            <div>12</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">Total Customers in Wishlist</h2>
            </div>
            <div>07</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">Top Product In Wishlist</h2>
            </div>
            <div>48</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">Wishlist From Cart</h2>
            </div>
            <div>12</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">Order From Wishlist</h2>
            </div>
            <div>12</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
        <div className="graph-data first">
          <div className="data-text-with-image">
            <div className="graph-image-with-text">
              <Icon source={CustomersMajor} color="base" />
              <h2 className="data-headers">Revenue From Wishlist</h2>
            </div>
            <div>12000</div>
          </div>
          <hr />
          <LineChart />
          <div className="view-report-button">
            <Button primary onClick={() => navigate('/reports')}>View report</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
