import Button from "~/components/customs/Button";
import Input from "~/components/customs/Input";
import InputV2 from "~/components/customs/InputV2";
import SearchBar from "~/components/customs/SearchBar";

function Home() {
  return <>
  <Input  placeholder="ạcg" />
  <InputV2 icon="recording-outline" type="text" placeholder="hello" border="rounded-full"/>
  <Button value="Đăng nhập" className="rounded-full border-2 border-cs_purple text-cs_purple"/>
  <SearchBar/>  
  </>;
}

export default Home;
