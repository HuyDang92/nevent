import SearchBar from "components/customs/SearchBar";
import Button from "components/customs/Button";
import InputV2 from "components/customs/InputV2";
function Home() {
  return <>
  <InputV2 icon="recording-outline"type="text" placeholder="hello" border="rounded-full"/>
  <Button value="Đăng nhập" className="rounded-full border-2 border-cs_purple text-cs_purple"/>
  <SearchBar/>  
  </>;
}

export default Home;
