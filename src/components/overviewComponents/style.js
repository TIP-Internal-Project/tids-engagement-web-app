import styled from 'styled-components'

export const SidebarDiv = styled.div`
  background-color: rgba(255, 255, 255, 1);
  width: 245px;
  height: 1041px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export const Components = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 697px;
  width: -webkit-fill-available;
  margin: 15px 0px 0px 0px;
  margin-left: 10px;
`

export const Events = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px rgba(38, 39, 42, 0.04);
  border-radius: 20px;
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px;
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  width: 48%;
`

export const EventsHeading1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 38px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Events1 = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 32px;
  text-transform: none;
  position: absolute;
  left: 0px;
  top: 3px;
`

export const ViewAll = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px 0px;
  gap: 4px;
  position: absolute;
  width: 90px;
  height: 38px;
  top: 0px;
  border-radius: 4px;
  right: 1%;
`

export const ViewAll1 = styled.div`
  width: 62px;
  height: 24px;
  font-family: Mulish;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: rgba(43, 128, 0, 1);
  flex: none;
  order: 0;
  flex-grow: 0;
`

export const Arrow = styled.div`
  position: absolute;
  left: 35.79;
  right: 0px;
  top: 5px;
  bottom: 25%;
`

// export const DateIcon = styled.div`
//   position: absolute;
//   right: 12.5%;
//   top: -2px;
//   bottom: 8.33%;
//   width: 24px;
//   height: 24px;
//   left: 5px;
// `

export const DateIcon = styled.div`
  margin-right: 0px; /* Add space between the icon and text */
  display: flex;
  align-items: center;
`

// export const TimeIcon = styled.div`
//   position: absolute;
//   left: 5px;
//   right: 8.33%;
//   top: -2px;
//   width: 24px;
//   height: 24px;
//   bottom: 8.33%;
// `

export const TimeIcon = styled.div`
  margin-right: 5px; /* Add space between the icon and text */
  display: flex;
  align-items: center;
`

export const RowDiv = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  margin: 24px 0px 0px 0px;
  width: -webkit-fill-available;
`

// export const RowDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: stretch; /* Ensure items take full width */
//   padding: 0px;
//   box-sizing: border-box;
//   margin: 24px 0px 0px 0px;
//   width: -webkit-fill-available;
// `


// export const Category = styled.div`
//   display: flex;
//   position: relative;
//   isolation: isolate;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   height: 10px;
//   margin: 0px;
// `


export const Category = styled.div`
  display: flex;
  flex-direction: column; /* Keep items in column direction */
  padding: 0px;
  box-sizing: border-box;
  width: 100%; /* Full width */
  margin: 8px 0px 0px 0px;
`

export const Rectangle1 = styled.div`
  background-color: rgba(102, 204, 0, 1);
  border-radius: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 0px;
  top: 6px;
`

export const EventCategory = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(84, 89, 95, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: uppercase;
  position: absolute;
  left: 16px;
  top: 0px;
`

// export const Headings = styled.div`
//   display: flex;
//   position: relative;
//   isolation: isolate;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   height: 48px;
//   width: -webkit-fill-available;
//   margin: 8px 0px 0px 0px;
// `

// export const Headings = styled.div`
//   display: flex;
//   flex-direction: column; /* Change to column to stack items */
//   position: relative;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   height: auto; /* Allow the height to adjust to content */
//   width: 100%; /* Full width */
//   margin: 8px 0px 0px 0px;
// `

export const Headings = styled.div`
  display: flex;
  flex-direction: column; /* Keep items in column direction */
  padding: 0px;
  box-sizing: border-box;
  width: 100%; /* Full width */
  margin: 8px 0px 0px 0px;
`

export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0; /* Add some padding for better spacing */
  box-sizing: border-box;
`
export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0; /* Add some padding for better spacing */
  box-sizing: border-box;
`
export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between; /* Push Title to the left and Priority to the right */
  align-items: center; /* Center vertically */
  width: 100%;
`

// export const Title = styled.div`
//     text-align: left;
// 	white-space: pre-wrap;
// 	font-synthesis: none;
// 	color: rgba(42, 44, 46, 1);
// 	font-style: normal;
// 	font-family: Mulish;
// 	font-weight: 700;
// 	font-size: 16px;
// 	letter-spacing: 0px;
// 	text-decoration: none;
// 	line-height: 24px;
// 	text-transform: none;
// 	width: -webkit-fill-available;
// 	position: absolute;
// 	left: 0px;
// 	top: 0px;
// `

// export const Title = styled.div`
//   text-align: left;
//   font-synthesis: none;
//   color: rgba(42, 44, 46, 1);
//   font-style: normal;
//   font-family: Mulish;
//   font-weight: 700;
//   font-size: 16px;
//   letter-spacing: 0px;
//   text-decoration: none;
//   line-height: 24px;
//   text-transform: none;
//   width: 100%;
//   overflow-wrap: break-word; /* Break long words */
//   white-space: normal; /* Allow wrapping */
//   margin-bottom: 4px; /* Space from DateAndTime */
// `

export const Title = styled.div`
  flex: 1;
  max-width: 60%; /* Adjust this percentage to make the title shorter or longer */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-family: Mulish;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-right: 0px; /* Spacing between Title and Priority */
`

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px; /* Space between Title row and Date row */
  color: rgba(113, 117, 123, 1);
  font-size: 14px;
`

// export const DateAndTime = styled.div`
//   display: flex;
//   position: relative;
//   isolation: isolate;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   height: 24px;
//   width: 310px;
//   margin: 8px 0px 0px 0px;
// `

export const DateAndTime = styled.div`
  display: flex;
  position: relative; 
  isolation: isolate; 
  flex-direction: row; 
  justify-content: flex-start; 
  align-items: flex-start; 
  padding: 0;
  box-sizing: border-box; 
  width: 310px; 
  margin-top: 8px; 
`

// export const Date = styled.div`
//   display: flex;
//   position: absolute;
//   isolation: isolate;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   width: 120px;
//   height: 24px;
//   left: 0px;
//   top: 0px;
// `

export const Date = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  box-sizing: border-box;
  width: auto; /* Adjust width as needed */
  height: auto; /* Adjust height as needed */
`

// export const DateTime = styled.div`
//   text-align: left;
//   white-space: pre-wrap;
//   font-synthesis: none;
//   color: rgba(113, 117, 123, 1);
//   font-style: normal;
//   font-family: Mulish;
//   font-weight: 400;
//   font-size: 14px;
//   letter-spacing: 0px;
//   text-decoration: none;
//   line-height: 20px;
//   text-transform: none;
//   position: absolute;
//   left: 32px;
//   top: 2px;
// `

export const DateTime = styled.div`
  text-align: left;
  white-space: nowrap; /* Ensures date stays in one line */
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  margin-left: 8px; /* Add space from the icon if needed */
`

export const Time = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 200px;
  height: 24px;
  left: 65%;
  top: 0px;
`

export const Divider = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0px 0px 0px;
  box-sizing: border-box;
  margin: 8px 0px 0px 0px;
  width: -webkit-fill-available;
`

export const Border = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 1px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Line = styled.div`
  background-color: rgba(216, 216, 216, 1);
  width: -webkit-fill-available;
  height: 1px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export const Category1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 20px;
  width: 49px;
  margin: 0px;
`

export const Rectangle2 = styled.div`
  background-color: rgba(42, 102, 255, 1);
  border-radius: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 0px;
  top: 6px;
`

export const DateAndTime1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: 321px;
  margin: 8px 0px 0px 0px;
`

export const Category2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 20px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Rectangle3 = styled.div`
  background-color: rgba(75, 40, 109, 1);
  border-radius: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 0px;
  top: 6px;
`

export const DateAndTime2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: -webkit-fill-available;
  margin: 8px 0px 0px 0px;
`

export const Category3 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 20px;
  width: 46px;
  margin: 0px;
`

export const Rectangle4 = styled.div`
  background-color: rgba(255, 10, 230, 1);
  border-radius: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 0px;
  top: 6px;
`

export const DateAndTime3 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: -webkit-fill-available;
  margin: 8px 0px 0px 0px;
`

export const Dashboard = styled.div`
  background-color: rgba(247, 248, 252, 1);
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  width: 100%;
  height: 1097px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  overflow: hidden;
`

export const Content = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px;
  box-sizing: border-box;
  left: 245px;
  top: 0px;
`

export const Row3 = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  left: 41px;
  top: 102px;
  width: 87%;
`

export const Header = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 44px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Task = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px rgba(38, 39, 42, 0.04);
  border-radius: 20px;
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px;
  box-sizing: border-box;
  width: 48%;
  right: 2.5%;
  top: 0px;
`

export const AddNewTask = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 558px;
  height: 65px;
  left: 0px;
  top: 592px;
`

export const Rectangle22 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  width: 558px;
  height: 1px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export const AddNewTaskTypeHere = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  width: 477px;
  position: absolute;
  left: 72px;
  top: 41px;
`

export const Heading1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 28px;
  width: -webkit-fill-available;
  margin: 0px;
`

// export const Priority = styled.div`
//   display: flex;
//   position: absolute;
//   isolation: isolate;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   width: 84px;
//   height: 28px;
//   right: 1%;
//   top: 0px;
// `

// export const Priority = styled.div`
//   display: flex;
//   position: relative; /* Change to relative */
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   padding: 0px;
//   box-sizing: border-box;
//   width: 84px;
//   height: 28px;
//   margin-top: 4px; /* Adjust margin to avoid overlap */
//   right: 1%;
// `

export const Priority = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  margin-left: -8px; /* Move Priority closer to the Title */
`

export const Rectangle20 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  border-radius: 16px;
  padding: 6px 12px;
  width: -webkit-fill-available;
`

export const Low = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 18%;
  top: 4px;
`

export const ShsAppImageryUpdates = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  width: 80%;
  position: absolute;
  left: 0px;
  top: 2px;
`

export const DateText1 = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 32px;
  top: 2px;
`

export const Rectangle17 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  width: 477px;
  height: 1px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: -webkit-fill-available;
`

export const Row = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  margin: 24px 0px 0px 0px;
  width: -webkit-fill-available;
`

export const Heading2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 28px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Priority1 = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 84px;
  height: 28px;
  right: 1%;
  top: 0px;
`

export const Rectangle201 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  border-radius: 28px;
  width: 84px;
  height: 28px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export const Medium = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 18%;
  top: 4px;
`

export const MyCareRefreshLaunchA = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  width: 80%;
  position: absolute;
  left: 0px;
  top: 2px;
`

export const Date1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: 120px;
  margin: 8px 0px 0px 0px;
`

export const Date2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: 120px;
  margin: 8px 0px 0px 0px;
`

export const DateText2 = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 32px;
  top: 2px;
`

export const Divider1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0px 0px 0px;
  box-sizing: border-box;
  margin: 8px 0px 0px 0px;
  width: -webkit-fill-available;
`

export const Border1 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 1px;
  margin: 0px;
  width: -webkit-fill-available;
`

export const Rectangle171 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  width: 477px;
  height: 1px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: -webkit-fill-available;
`

export const Row2 = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  left: 41px;
  top: 211px;
  width: 87%;
`

export const Heading3 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 28px;
  width: -webkit-fill-available;
  margin: 0px;
`

export const Priority2 = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 84px;
  height: 28px;
  right: 1%;
  top: 0px;
`

export const Rectangle202 = styled.div`
  background-color: rgba(193, 35, 53, 1);
  border-radius: 16px;
  padding: 6px 12px;
  width: -webkit-fill-available;
`

export const High = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(255, 255, 255, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 18%;
  top: 4px;
`

export const HealthQuebecClinicsP = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  width: 80%;
  position: absolute;
  left: 0px;
  top: 2px;
`

export const Date3 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 24px;
  width: 123px;
  margin: 8px 0px 0px 0px;
`

export const DateText3 = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(113, 117, 123, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 20px;
  text-transform: none;
  position: absolute;
  left: 32px;
  top: 2px;
`

export const Divider2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0px 0px 0px;
  box-sizing: border-box;
  margin: 8px 0px 0px 0px;
  width: -webkit-fill-available;
`

export const Border2 = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  height: 1px;
  margin: 0px;
  width: -webkit-fill-available;
`

export const Rectangle172 = styled.div`
  background-color: rgba(216, 216, 216, 1);
  width: -webkit-fill-available;
  height: 1px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: -webkit-fill-available;
`

export const EventsHeading = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: -webkit-fill-available;
  height: 38px;
  margin: 0px;
`

export const Task1 = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42, 44, 46, 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 32px;
  text-transform: none;
  position: absolute;
  left: 0px;
  top: 3px;
`

export const Overview = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42; 44; 46; 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 500;
  font-size: 28px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 36px;
  text-transform: none;
  position: absolute;
  left: 0px;
  top: 4px;
`

export const Rectangle25 = styled.div`
  background-color: rgba(216; 216; 216; 1);
  width: 1px;
  height: 32px;
  position: absolute;
  left: 951px;
  top: 6px;
`

export const Name = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(42; 44; 46; 1);
  font-style: normal;
  fon-ffamily: Mulish;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  position: absolute;
  left: 976px;
  top: 10px;
`

export const Photo = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  left: 1103px;
  top: 0px;
`

export const ProfileCircle = styled.div`
  height: 44px;
  width: 44px;
  position: absolute;
  left: 0px;
  top: 0px;
`

export const Initials = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(255; 255; 255; 1);
  font-style: normal;
  font-family: Mulish;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0px;
  text-decoration: none;
  line-height: 24px;
  text-transform: none;
  position: absolute;
  left: 13px;
  top: 10px;
`
