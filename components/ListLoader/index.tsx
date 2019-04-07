import ContentLoader from 'react-content-loader';

const ListLoader = () => (
  <ContentLoader
    height={350}
    width={320}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    uniquekey={'1'}
    style={{ width: 320 }}
  >
    <rect x="20" y="28" rx="0" ry="0" width="250" height="28" />

    <rect x="20" y="85" rx="0" ry="0" width="100" height="100" />
    <rect x="140" y="85" rx="0" ry="0" width="100" height="16" />

    <rect x="20" y="203" rx="0" ry="0" width="120" height="18" />
    <rect x="20" y="250" rx="0" ry="0" width="80" height="18" />
    <rect x="20" y="297" rx="0" ry="0" width="150" height="18" />
  </ContentLoader>
);

export default ListLoader;
