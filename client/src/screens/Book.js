import { useState, useEffect } from "react";
import React from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  ButtonDropdown,
  Dropdown,
} from "reactstrap";

import Table from "./Table";

export default props => {
  const [totalTables, setTotalTables] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "Orice locatie",
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // List of potential locations
  const [locations] = useState(["Orice locatie", "Terasa", "Interior", "Bar"]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyTables = () => {
    let tables = totalTables.filter(table => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async () => {
        let datetime = getDate();
        let res = await fetch("http://localhost:5000/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          table =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Orice locatie"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out and the time is valid
  const reserve = async () => {
    if (
      booking.name.length === 0 ||
      booking.phone.length === 0 ||
      booking.email.length === 0
    ) {
      console.log("Detalii incomplete");
      setReservationError(true);
    } else {
      const datetime = getDate();
      const now = new Date();
      if (datetime < now) {
        console.log("Timpul selectat este mai devreme decât timpul curent");
      } else {
        let res = await fetch("http://localhost:5000/reservation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...booking,
            date: datetime,
            table: selection.table.id
          })
        });
        res = await res.text();
        console.log("Reservat: " + res);
        props.history.push("/thankyou");
      }
    }
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id
      }
    });
  };

  // Generate party size dropdown
  const getSizes = () => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={() => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = () => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={() => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              location: loc
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = () => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={() => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables state
  const getTables = _ => {
    console.log("Preluare mese");
    if (getEmptyTables() > 0 && getDate() >= new Date()) { // Add condition to check if the selected datetime is in the future
      let tables = [];
      totalTables.forEach(table => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
    return <p className="wrong-time">Ati introdus o data invalida</p>; // If the condition is not met, return null
  };


  return (
    <div className="reservation-wrapper">
      <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
          <p className="looking-for-pizza">
            {!selection.table.id ? "Rezerva o masa" : "Confirmare rezervare"}
            <i
              className={
                !selection.table.id
                  ? "fas fa-chair pizza-slice"
                  : "fas fa-clipboard-check pizza-slice"
              }
            ></i>
          </p>
          <p className="selected-table">
            {selection.table.id
              ? "Urmeaza sa rezervi masa " + selection.table.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Va rugam sa completati toate detaliile.
            </p>
          ) : null}
        </Col>
      </Row>

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                id="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={e => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date(e.target.value)
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Data invalida");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date()
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle caret color="none" id="booking-dropdown">
                  {selection.time === null ? "Alege ora" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret id="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret id="booking-dropdown">
                  {selection.size === 0
                    ? "Alege numarul de persoane"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <center>
            <Row noGutters className="tables-display justify-content-center">
              <Col>
                {getEmptyTables() > 0 ? (
                  <p className="available-tables">{getEmptyTables()} mese libere</p>
                ) : null}

                {selection.date && selection.time ? (
                  getEmptyTables() > 0 ? (
                    <div>
                      <div className="table-key">
                        <span className="empty-table"></span> &nbsp; Liber
                        &nbsp;&nbsp;
                        <span className="full-table"></span> &nbsp; Ocupat
                        &nbsp;&nbsp;
                      </div>
                      <Row noGutters>{getTables()}</Row>
                    </div>
                  ) : (
                    <p className="table-display-message">Nicio masa libera</p>
                  )
                ) : (
                  <p className="table-display-message">
                    Va rugam sa selectati data si ora rezervarii.
                  </p>
                )}
              </Col>
            </Row>
          </center>


        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="text-center justify-content-center reservation-details-container"
          >
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Nume"
                className="reservation-input"
                value={booking.name}
                onChange={e => {
                  setBooking({
                    ...booking,
                    name: e.target.value
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Numar de telefon"
                className="reservation-input"
                value={booking.phone}
                onChange={e => {
                  setBooking({
                    ...booking,
                    phone: e.target.value
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="reservation-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={e => {
                  setBooking({
                    ...booking,
                    email: e.target.value
                  });
                }}
              />
            </Col>
          </Row>
          <Row noGutters className="text-center">
            <Col>
              <button
                className="book-table-btn"
                onClick={() => {
                  reserve();
                }}
              >
                Rezervare masa
              </button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
