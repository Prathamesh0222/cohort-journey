import {
  CreditCard,
  HomeIcon,
  Settings,
  UserRoundCog,
  UsersIcon,
} from "lucide-react";
import { Avatar } from "../Image/avatar";

const Icons = {
  Home: <HomeIcon />,
  Users: <UsersIcon />,
  Card: <CreditCard />,
  UserSettings: <UserRoundCog />,
  Settings: <Settings />,
};

const Sidebar = () => {
  const SidebarContent = [
    {
      title: "Home",
      icon: Icons.Home,
      link: "/home",
    },
    {
      title: "Webinars",
      icon: Icons.Users,
      link: "/webinars",
    },
    {
      title: "Billing",
      icon: Icons.Card,
      link: "/billing",
    },
    {
      title: "User Management",
      icon: Icons.UserSettings,
      link: "/user-management",
    },
    {
      title: "Settings",
      icon: Icons.Settings,
      link: "/settings",
    },
  ];
  return (
    <div className="p-4 space-y-4">
      <img
        src={Avatar}
        alt="Vegeta"
        width={45}
        height={45}
        className="rounded-full"
      />
      {SidebarContent.map(
        (
          content: {
            title: string;
            icon?: JSX.Element;
            link?: string;
          },
          index: number
        ) => (
          <div key={index}>
            <div className="flex justify-between p-2 hover:bg-cyan-500 hover:text-blue-500">
              <p>{content.title}</p>
              <span>{content.icon}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Sidebar;
