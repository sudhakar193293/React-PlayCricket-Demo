import MainHeader from './components/MainHeader.jsx'
function App() {
  const data = 
{
    Clubs:
    [
        { subdomain: "wanderers", name: "The Wanderers CC", id: 6303, clubLinks: [{ id: 1, name: 'ManageClub', path: "/manageClub", enable: true }, { id: 2, name: 'CustomiseClubWebsite', path: "/CustomiseClubWebsite", enable: true }] },
        { subdomain: "saffronwalden", name: "Saffron Walden CC", id: 5476, clubLinks: [{ id: 1, name: 'ManageClub', path: "/manageClub", enable: true }, { id: 2, name: 'CustomiseClubWebsite', path: "/CustomiseClubWebsite", enable: false }] }
    ],

    UserRoles:
    [
        {
            id: 1, clubid: 6303, role: { id: 1, name: 'main_adminstrator' }, permissions: [{ header: { id: 1, name: 'day_to_day', enable: true }, subHeader: [{ id: 1, parentId: 1, name: 'manage Fixture', enable: true, path: "/managefixture" }, { id: 2, name: 'Confirm Results', enable: true, path: "/confirmresults" }] }, { header: { id: 2, name: 'Action Center', enable: true }, subHeader: null }]
        },
        {
            id: 2, clubid: 5476, role: { id: 2, name: 'member_of_the_website' }, permissions: [{ header: { id: 1, name: 'day_to_day', enable: false }, subHeader: [{ id: 1, parentId: 1, name: 'manage Fixture', enable: true, path: "/managefixture" }, { id: 2, name: 'Confirm Results', enable: true, path: "/confirmresults" }] }, { header: { id: 2, name: 'Action Center', enable: true }, subHeader: null }]
        }
    ],
    userInfo: { signedIn:true, id:101, userName: 'Srikanth', childUsers: [{ id:201, userName: "child1" }] }
}
  return (
    <>
      <MainHeader data={data}/>
    </>
  )
}

export default App
