module.exports = {
  reactStrictMode: true,
      async rewrites() {
      return [
        {
          source: "/product/:productContainer/:detail",
          destination: "/container/detailtype/:detail",    
        },
       
      ];

    }   
  
}
