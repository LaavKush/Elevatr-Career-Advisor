// src/pages/Resources.jsx
import React, { Component } from "react";
import companyData from "../utils/data";
import ResourceCard from "../components/ResourceCard";
import Sidebar from "./Sidebar";
import ChatBubble from "../components/chatbubble"; // ✅ Import ChatBubble

class Resources extends Component {
  state = {
    search: "",
    selectedCompany: "",
    dropdownOpen: false,
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
      dropdownOpen: true,
      selectedCompany: "",
    });
  };

  handleFocus = () => {
    this.setState({ dropdownOpen: true });
  };

  handleSelect = (company) => {
    this.setState({
      selectedCompany: company,
      search: company,
      dropdownOpen: false,
    });
  };

  handleClickOutside = (e) => {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.setState({ dropdownOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { search, selectedCompany, dropdownOpen } = this.state;

    const filteredData = companyData.filter((c) =>
      c.company.toLowerCase().includes(search.toLowerCase())
    );

    const companiesToShow =
      selectedCompany === ""
        ? filteredData
        : filteredData.filter((c) => c.company === selectedCompany);

    return (
      <div className="flex" ref={(node) => (this.containerRef = node)}>
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen relative">
          <h1 className="text-3xl font-bold mb-6">Tech Career Guides</h1>

          {/* Merged Input + Dropdown */}
          <div className="relative w-full max-w-md mb-6">
            <input
              type="text"
              value={search}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              placeholder="Search or Select Company"
              className="w-full p-2 border rounded"
            />

            {dropdownOpen && filteredData.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto mt-1">
                {filteredData.map((c, idx) => (
                  <li
                    key={idx}
                    className="p-2 cursor-pointer hover:bg-green-100"
                    onClick={() => this.handleSelect(c.company)}
                  >
                    {c.company}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Render ResourceCards */}
          {companiesToShow.map((company, idx) => (
            <ResourceCard key={idx} companyData={company} />
          ))}

          {/* ✅ Floating ChatBubble at bottom-right */}
          <div className="fixed bottom-6 right-6 flex flex-col items-center">
            <ChatBubble />
            {/* <p className="text-sm text-gray-600 mt-1">Ask your doubts</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Resources;
