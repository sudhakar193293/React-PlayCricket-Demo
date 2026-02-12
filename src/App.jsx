import MainHeader from './components/MainHeader.jsx'
function App() {
  localStorage.setItem('role','admin');
const data={
  topHeaderData: {   
    user: {
      id: 1,
      userName: "Srikanth",
      signedIn: true,
      childUsers: [
        {
          id: 101,
          userName: "Ram"
        }
      ]
    },
    roles: [
      {
        website: {
          id: 1,
          name: "The Wanderers CC",
          subdomain: "wanderers"
        },
        hasAdminAccess : false, 
        roles: [
          {
            id: 81,
            name: "scorer"
          },
          {
            id: 98,
            name: "umpire"
          }
        ]
      },
      {
        website: {
          id: 31,
          name: "The Forty Club",
          subdomain: "thefortyclub"
        },
        hasAdminAccess: true,
        roles: [
          {
            id: 42,
            name: "main_administrator"
          }
        ]
      }
    ],
  },
  headerData: {
    website: {
      id: 31,
      name: "The Forty Club",
      subdomain: "thefortyclub",
      badge: "/thefortyclub"
    },
    roles: [
      {
        id: 49,
        name: "random",
        isCustom: true,
        permissions: {
          day_to_day: {
          fixtures: true,
          results: true,
          emails: true,
          members: true,
          league: true,
          find_a: true,
          bookings: true
          },
          site_management: {
            about_us: true,
            gallery: true,
            information_board: true,
            site_builder: true,
            website_configuration: true
          },
          setup: {
            administrator_roles: true,
            messaging_groups: true,
            privacy_notices: true,
            scoring_rules: true,
            teams: true
          },
          report_download: {
            ground_usage: true,
            matches: true,
            club_registered_players: true,
            website_statistics:true
          },
          upload: {
            badge: true,
            members_upload: true
          }
        } 
      }
    ]
  }
}
  return (
    <>
      <MainHeader data={data || null}/>
    </>
  )
}

export default App
