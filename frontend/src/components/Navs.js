import {
  FaHouse,
  FaListCheck,
  FaMoneyCheckDollar,
  FaCalendar,
  FaRightFromBracket,
  FaUser,
} from "react-icons/fa6";

export const Navs = [
  {
    title: "Dashboard",
    icon: <FaHouse size={21} className="icon" />,
    path: "/Home",
  },
  {
    title: "Tasks Manager",
    icon: <FaListCheck size={21} className="icon" />,
    path: "/Tasks",
  },
  {
    title: "Expenses Manager",
    icon: <FaMoneyCheckDollar size={21} className="icon" />,
    path: "/Expenses",
  },
  {
    title: "Calender",
    icon: <FaCalendar size={21} className="icon" />,
    path: "/Calendar",
  },
];

export const Prof = [
  {
    title: "My Profile",
    icon: <FaUser size={21} className="icon" />,
    path: "/Profile",
  },
  {
    title: "Sign Out",
    icon: <FaRightFromBracket size={21} className="icon" />,
    path: "/signIn",
  },
];
