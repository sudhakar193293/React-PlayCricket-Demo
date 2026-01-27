const roleAccessMap = {
  super_admin: ["Manage Club", "Customise Club Website", "View Club Website", "Team Reports"], // full access
  member_of_the_website: ["View Club Website"],
  umpire: ["View Club Website", "Team Reports"],
  main_administrator: ["Manage Club", "Customise Club Website", "View Club Website", "Team Reports"],
  scorer: ["View Club Website"],
  cricket_force: ["View Club Website"],
  squad_player: ["View Club Website"],
  league_registered_player: ["View Club Website"],
  messaging_group: ["View Club Website"],
  data_import: [],
  ecb_admin: ["Manage Club", "Customise Club Website", "View Club Website", "Team Reports"],
  disability_cricket_admin: ["Manage Club", "Customise Club Website", "View Club Website", "Team Reports"],
  teams_administrator: ["Manage Club", "View Club Website", "Team Reports"],
  team_report: ["View Club Website", "Team Reports"],
 
  // fallback
  default: []
};

const allLinks = {
  "Manage Club": "/manage-club",
  "Customise Club Website": "https://annatest.play-cricket.com/site_admin/website_configurations/home_page",
  "View Club Website": "https://annatest.play-cricket.com/home",
  "Team Reports": "https://annatest.play-cricket.com/team_captain_reports"
};

export const getLinksByRole = (role) => {
  const allowedLinks = roleAccessMap[role] || roleAccessMap.default;
 
  return allowedLinks.map((label) => ({
    label,
    url: allLinks[label]
  }));
};