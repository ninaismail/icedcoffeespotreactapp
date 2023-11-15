async function getData() {
    let data = []
    const axios = (await import("axios")).default;
    await axios.get('https://icedcoffespotreactapp-default-rtdb.firebaseio.com/icedcoffees.json', {
      headers: {
        'Cache-Control': 'max-age=3600', // Cache for 1 hour
      },
    })
      .then(res => {
        data = res.data;
    })
    .catch((error) => {
      console.log(error)
      data=[]
    })
  return data;
}
export { getData };