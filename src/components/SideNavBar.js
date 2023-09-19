import React, { useState, useEffect, useRef } from "react";
import "./SideNavBar.css";
import transaction_icon from "../assets/transaction_icon.svg";
import dashboard_icon from "../assets/dashboard_icon.svg";
import setting_icon from "../assets/setting_icon.svg";
import user_icon from "../assets/user_icon.svg";
import schedule_icon from "../assets/schedule_icon.svg";
import Ellipse from "../assets/Ellipse.svg";
import Vector from "../assets/Vector.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Vector2 from "../assets/Vector2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Vector3 from "../assets/Vector3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import Vector4 from "../assets/Vector4.svg";
import notify from "../assets/notify.svg";
import addeclipse from "../assets/addeclipse.svg";
import Mail from "../assets/Mail.svg";
import propic from "../assets/propic.png";
import wp2 from "../assets/wp2.svg";
import YT from "../assets/youtube.svg";
import Ig from "../assets/instagram.svg";
import add from "../assets/add.svg";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const SideNavBar = () => {
  const [isExpanded, setExpendState] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [isProfileAdded, setProfileAdded] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };

  const handleYoutubeChange = (e) => {
    setYoutube(e.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
    setActiveSection("basic"); // Set the default active section to basic
  };

  const closeModal = () => {
    // Capture the profile data and set it in state
    const newProfileData = {
      name,
      email,
      phone,
      instagram,
      youtube,
    };

    setProfileData(newProfileData);

    // Set the profile added flag to true
    setProfileAdded(true);

    // Close the modal
    setModalOpen(false);
  };

  const switchToBasicSection = () => {
    setActiveSection("basic");
  };

  const switchToContactSection = () => {
    setActiveSection("contact");
  };
  const handleTextChange = (e) => {
    setName(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: dashboard_icon,
    },
    {
      text: "Transactions",
      icon: transaction_icon,
    },
    {
      text: "Schedules",
      icon: schedule_icon,
    },
    {
      text: "Users",
      icon: user_icon,
    },
    {
      text: "Settings",
      icon: setting_icon,
    },
  ];

  useEffect(() => {
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((response) => response.json())
      .then((data) => {
        const desiredBrands = [
          "marcelle",
          "physicians formula",
          "cargo cosmetics",
          "covergirl",
          "elf",
          "maybelline",
          "l'oreal",
          "revlon",
        ];

        const filteredData = data.filter(
          (product) =>
            product.brand && desiredBrands.includes(product.brand.toLowerCase())
        );
        const brandCounts = {};
        filteredData.forEach((product) => {
          const brandName = product.brand;
          if (!brandCounts[brandName]) {
            brandCounts[brandName] = {
              total: 0,
              fiveStar: 0,
            };
          }

          brandCounts[brandName].total++;
          if (product.rating === 5) {
            brandCounts[brandName].fiveStar++;
          }
        });
        const brands = Object.keys(brandCounts);
        const totalProducts = brands.map((brand) => brandCounts[brand].total);
        const fiveStarProducts = brands.map(
          (brand) => brandCounts[brand].fiveStar
        );

        setChartData({
          labels: brands,
          datasets: [
            {
              label: "Total Products",
              data: totalProducts,
              backgroundColor: "#98D89E",
              borderColor: "#98D89E",
              barPercentage: 0.9,
              borderRadius: 5,
              categoryPercentage: 0.5,
            },
            {
              label: "5-Star Products",
              data: fiveStarProducts,
              backgroundColor: "#EE8484",
              borderColor: "#EE8484",
              borderRadius: 5,
              barPercentage: 0.9,
              categoryPercentage: 0.5,
            },
          ],
        });
        const topThreeBrands = Object.keys(brandCounts)
          .sort((a, b) => {
            const brandA = brandCounts[a];
            const brandB = brandCounts[b];
            const percentageA = (brandA.fiveStar / brandA.total) * 100;
            const percentageB = (brandB.fiveStar / brandB.total) * 100;
            return percentageB - percentageA;
          })
          .slice(0, 3);

        const brandPercentages = topThreeBrands.map((brand) => {
          const percentage =
            (brandCounts[brand].fiveStar / brandCounts[brand].total) * 100;
          return percentage.toFixed(2);
        });

        const doughnutData = {
          labels: topThreeBrands.map(
            (brand, index) => `${brand} (${brandPercentages[index]}%)`
          ),
          datasets: [
            {
              data: topThreeBrands.map((brand) => brandCounts[brand].fiveStar),
              backgroundColor: ["#98D89E", "#EE8484", "#F6DC7D"],
              borderWidth: 0,
            },
          ],
        };

        setDoughnutChartData(doughnutData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chartOptions = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
        position: "top",
      },
    },
    plugins: {
      legend: {
        position: "right",
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="main-container">
      <div
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
        }
      >
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <img src="icons/Logo.svg" alt="" srcset="" />
                <h2>Board.</h2>
              </div>
            )}
            <button
              className={
                isExpanded
                  ? "hamburger hamburger-in"
                  : "hamburger hamburger-out"
              }
              onClick={() => setExpendState(!isExpanded)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="nav-menu">
            {menuItems.map(({ text, icon }, index) => (
              <a
                key={index}
                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
                href="#"
              >
                <div className="menu-item-content">
                  <img className="menu-item-icon" src={icon} alt="" srcSet="" />
                  {isExpanded && <p>{text}</p>}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="nav-footer">
          {isExpanded && (
            <div className="nav-details">
              <img
                className="nav-footer-avatar"
                src="icons/admin-avatar.svg"
                alt=""
                srcset=""
              />
              <div className="footer">
                <p className="footer-text">Help</p>
                <p className="footer-text">Contact Us</p>
              </div>
            </div>
          )}
          <img
            className="logout-icon"
            src="icons/logout.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>

      <div className="right-container">
        <div className="navbar">
          <h2>Dashboard</h2>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="icons">
            {/* Notification icon component */}
            <img src={notify} />
            {/* Profile picture icon component */}
            <img src={propic} alt="Profile" />
          </div>
        </div>
        <div className="secondary-div">
          <div className="dashboard-container">
            <div className="container">
              <div className="box-container">
                <div className="box box1">
                  <p className="textboxes">
                    <svg
                      width="50"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* First SVG Image */}
                      <image
                        x="0"
                        y="0"
                        width="50"
                        height="40"
                        xlinkHref={Ellipse}
                      />

                      {/* Second SVG Image on top */}
                      <image
                        x="12.5"
                        y="10"
                        width="25"
                        height="20"
                        xlinkHref={Vector}
                      />
                    </svg>
                    <br></br>
                    Total Revenue
                    <br></br>
                    <h3>$122,000</h3>
                    <p className="percentages">+2.5%</p>
                  </p>
                  <h1 className="texts"></h1>
                </div>
                <div className="box box2">
                  <p className="textboxes">
                    <svg
                      width="50"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* First SVG Image */}
                      <image
                        x="0"
                        y="0"
                        width="50"
                        height="40"
                        xlinkHref={Ellipse2}
                      />

                      {/* Second SVG Image on top */}
                      <image
                        x="12.5"
                        y="10"
                        width="25"
                        height="20"
                        xlinkHref={Vector2}
                      />
                    </svg>
                    <br></br>
                    Total Transactions
                    <br></br>
                    <h3>1520</h3>
                    <p className="percentages">+2.5%</p>
                  </p>
                  <h1 className="texts1"></h1>
                </div>
                <div className="box box3">
                  <p className="textboxes">
                    <svg
                      width="50"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* First SVG Image */}
                      <image
                        x="0"
                        y="0"
                        width="50"
                        height="40"
                        xlinkHref={Ellipse3}
                      />

                      {/* Second SVG Image on top */}
                      <image
                        x="12.5"
                        y="10"
                        width="25"
                        height="20"
                        xlinkHref={Vector3}
                      />
                    </svg>
                    <br></br>
                    Total Likes
                    <br></br>
                    <h3>9721</h3>
                    <p className="percentages">+2.5%</p>
                  </p>
                  <h1 className="texts2"></h1>
                </div>
                <div className="box box3">
                  <p className="textboxes">
                    <svg
                      width="50"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* First SVG Image */}
                      <image
                        x="0"
                        y="0"
                        width="50"
                        height="40"
                        xlinkHref={Ellipse4}
                      />

                      {/* Second SVG Image on top */}
                      <image
                        x="12.5"
                        y="10"
                        width="25"
                        height="20"
                        xlinkHref={Vector4}
                      />
                    </svg>
                    <br></br>
                    Total Users
                    <br></br>
                    <h3>1520</h3> <p className="percentages">+2.5%</p>
                  </p>
                  <h1 className="texts2"></h1>
                </div>
              </div>
            </div>
            <div className="chart">
              <div className="bar-chart-title">
                <h4>Activities</h4>
                <p>July 2023 to Aug 2023</p>
              </div>
              <div className="bar-chart">
                {chartData && <Bar data={chartData} options={chartOptions} />}
              </div>
            </div>
          </div>
          <div className="profile">
            <div className="chart2">
              <div className="chart-title">
                <h4>Top Products</h4>
                <p>July 2023 to Aug 2023</p>
              </div>
              {doughnutChartData && (
                <Doughnut
                  className="doughnut-chart"
                  data={doughnutChartData}
                  options={{
                    cutoutPercentage: 10,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          usePointStyle: true,
                          fontColor: "black",
                          boxWidth: 10,
                          padding: 10,
                        },
                      },
                    },
                  }}
                />
              )}
            </div>

            {isProfileAdded ? (
              <div className="chart3">
                <div className="row">
                  <div className="column1">
                    <h4 className="proname">{profileData.name}</h4>
                    <div className="data-pair">
                      <img src={wp2} alt="Phone" />
                      <p className="phn">{profileData.phone}</p>
                    </div>
                    <div className="data-pair">
                      <img src={Mail} alt="Email" />
                      <p>{profileData.email}</p>
                    </div>
                  </div>
                  <div className="column2">
                    <div className="data-pair">
                      {profileData.instagram && (
                        <p>
                          <img src={Ig} />
                          {profileData.instagram}
                        </p>
                      )}
                    </div>
                    <div className="data-pair">
                      {profileData.youtube && (
                        <p>
                          <img src={YT} />
                          {profileData.youtube}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chart3">
                <button className="addprofile" onClick={openModal}>
                  <svg
                    width="100"
                    height="80"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* First SVG Image */}
                    <image
                      x="0"
                      y="0"
                      width="100"
                      height="80"
                      xlinkHref={addeclipse}
                    />

                    {/* Second SVG Image on top */}
                    <image
                      x="25"
                      y="20"
                      width="50"
                      height="40"
                      xlinkHref={add}
                    />
                  </svg>
                  <h4>Add Profile</h4>
                </button>
              </div>
            )}
          </div>
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add New Profile</h2>
              <div className="basictosocial">
                <div className="section-buttons">
                  <p>Basic</p>
                  <button
                    className={`section-button ${
                      activeSection === "basic" ? "active" : ""
                    }`}
                    onClick={switchToBasicSection}
                  ></button>
                </div>
                <div className="section-buttons">
                  <p>Social</p>
                  <button
                    className={`section-button ${
                      activeSection === "contact" ? "active" : ""
                    }`}
                    onClick={switchToContactSection}
                  ></button>
                </div>
              </div>
              <div
                className={`active-line ${
                  activeSection === "contact" ? "right" : "left"
                }`}
              ></div>

              {activeSection === "basic" && (
                <div>
                  <p>Enter Name*</p>
                  <input
                    type="text"
                    placeholder="Eg. John Doe"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                  <p>Enter Email*</p>
                  <input
                    type="email"
                    placeholder="Eg. John@xyz.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <p>Enter Mobile*</p>
                  <input
                    type="tel"
                    placeholder="Eg. 9123456781"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  <button onClick={switchToContactSection} className="btnnext">
                    Next
                  </button>
                </div>
              )}

              {activeSection === "contact" && (
                <div>
                  <p>Instagram link (optional)</p>
                  <input
                    type="text"
                    placeholder="Eg. ..instagram.com/username"
                    value={instagram}
                    onChange={handleInstagramChange}
                  />
                  <p>YouTube link (optional)</p>
                  <input
                    type="text"
                    placeholder="Eg. ..youtube/username"
                    value={youtube}
                    onChange={handleYoutubeChange}
                  />
                  <div className="button-container">
                    <button onClick={switchToBasicSection} className="btnback">
                      Back
                    </button>
                    <button onClick={closeModal} className="btnnext">
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavBar;
