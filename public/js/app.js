
const resultDOM = document.querySelector('.result')
const formDOM = document.querySelector('#weatherForm')
const userInput = document.querySelector('#userInput')



formDOM.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location= userInput.value.trim()
  resultDOM.textContent="Loading..."
  // console.log(location)
  getWeather(location)
  userInput.value=''
})

const getWeather =(location)=>{
  const weatherUrl = `/weather?address=${location}`
  fetch(weatherUrl)
  .then((res)=>{
    res.json().then((data)=>{
      if(data.error){
        return resultDOM.innerHTML= `<strong> ${data.error}!!</strong>`
      }
      resultDOM.innerHTML= `At <strong>${data.location}</strong> it is <strong>${data.forecast}</strong> °C outside.`
      // console.log(data)
    })
  })
}
