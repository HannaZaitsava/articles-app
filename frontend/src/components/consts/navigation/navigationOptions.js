import {
  HomeIcon,
  CalendarDaysIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const navigationOptions = [
  {
    name: "Posts",
    href: "/posts",
    showInMainNavbar: true,
    authNeeded: false,
    imgSource: HomeIcon,
    tooltipTitle: "Articles",
  },
  {
    name: "Authors",
    href: "/users",
    showInMainNavbar: true,
    authNeeded: false,
    imgSource: UsersIcon,
    tooltipTitle: "Authors",
  },
  {
    name: "My Profile",
    href: "/myprofile",
    showInMainNavbar: false,
    authNeeded: true,
    imgSource: UserIcon,
    tooltipTitle: "Calendar",
  },
  {
    name: "Subscriptions",
    href: "/users",
    showInMainNavbar: false,
    authNeeded: true,
    imgSource: UsersIcon,
    tooltipTitle: "Subscriptions",
  },
  {
    name: "Calendar",
    href: "/calendar",
    showInMainNavbar: false,
    authNeeded: true,
    imgSource: CalendarDaysIcon,
    tooltipTitle: "Calendar",
  }
  //{ name: "Admin", href: "/admin", showInMainNavbar: false, authNeeded: true }, // permissions needed
]

export default navigationOptions;
