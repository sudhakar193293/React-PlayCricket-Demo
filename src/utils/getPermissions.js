export const getPermissions = () => {
  return (
    {
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
  )
};