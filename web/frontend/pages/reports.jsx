import { Button, Icon } from "@shopify/polaris";
import React, { useState } from "react";
import { FormsMajor } from "@shopify/polaris-icons";
import Papa from "papaparse";
import { Table, Input, Select } from "antd";

const reports = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState(true);

  const dataSource = [
    {
      key: 1,
      id: 1,
      name: "Sarika",
      email: "sample@helo.in",
      count: 15,
    },
    {
      key: 2,
      id: 2,
      name: "New",
      email: "new@heloo.in",
      count: 4,
    },
    {
      key: 3,
      id: 3,
      name: "Test",
      email: "test@hell.in",
      count: 10,
    },
    {
      key: 4,
      id: 4,
      name: "Demo",
      email: "demo@heloo.com",
      count: 1,
    },
    {
      key: 5,
      id: 5,
      name: "hello world",
      email: "hello@world.test",
      count: 190534,
    },
  ];

  const sortedDataSource = sorting
    ? [...dataSource].sort((a, b) => b.id - a.id)
    : [...dataSource].sort((a, b) => a.id - b.id);

  const filteredDataSource = sortedDataSource.filter((record) => {
    const values = Object.values(record).map((value) =>
      String(value).toLowerCase()
    );
    return values.some((val) => val.includes(value.toLowerCase()));
  });

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const handleFileUpload = (files) => {
    // Check if files were selected
    if (files && files.length > 0) {
      const file = files[0]; // Assuming only one file is selected

      // Perform file handling logic here
      // For example, you can read the file content or upload it to a server
      console.log("Selected file:", file);
    }
  };

  const handleDownload = () => {
    const csvData = Papa.unparse(filteredDataSource);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "submission.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dr-reports-page">
      <div className="dr-reports-heading-with-buttons">
        <div className="dr-reports-heading">Reports</div>
        <div className="dr-reports-import-export-buttons">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(event) => handleFileUpload(event.target.files)}
          />

          <label htmlFor="fileInput" className="reports-button import">
            <Icon source={FormsMajor} color="base" />
            Import
          </label>

          <button className="reports-button export" onClick={handleDownload}>
            <Icon source={FormsMajor} color="base" />
            Export
          </button>
        </div>
      </div>
      <div class="hr-line-layout"></div>
      <div className="dr-reports-tab-with-data">
        <div className="dr-reports-tab">
          <div
            className={`dr-tabs-heading-div ${
              activeButton === 0 ? "actives" : ""
            }`}
            onClick={() => handleButtonClick(0)}
          >
            <h2 className="dr-tabs-heading">Product Wishlist</h2>
          </div>
        </div>
        <div className="dr-reports-tab">
          <div
            className={`dr-tabs-heading-div ${
              activeButton === 1 ? "actives" : ""
            }`}
            onClick={() => handleButtonClick(1)}
          >
            <h2 className="dr-tabs-heading">User Wishlist</h2>
          </div>
        </div>
      </div>
      {activeButton === 0 && (
        <>
          <div className="reports-productwishlist-table">
            <div className="search-with-filter">
              <Input
                placeholder="Search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <Select
                className="listing-selection"
                placeholder="Filter by"
                onChange={(value) => setSorting(value === "new")}
              >
                <Select.Option value="new">New</Select.Option>
                <Select.Option value="old">Old</Select.Option>
              </Select>
            </div>
            <Table
              columns={[
                {
                  title: "Id",
                  dataIndex: "id",
                },
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Wishlist Count",
                  dataIndex: "count",
                },
              ]}
              dataSource={filteredDataSource}
              scroll={{
                x: 760
              }}
  
            />
          </div>
        </>
      )}
    </div>
  );
};

export default reports;
