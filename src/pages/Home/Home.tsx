import Button from "~/components/customs/Button";
import Input from "~/components/customs/Input";
import InputIcon from "~/components/customs/InputIcon";
import SearchBar from "~/components/customs/SearchBar";

function Home() {
  return <>
  <Input  placeholder="ạcg" />
  <InputIcon icon="recording-outline" type="text" placeholder="hello" border="rounded-full"/>
  <Button value="Đăng nhập" className="rounded-full border-2 border-cs_purple text-cs_purple"/>
  <SearchBar/>  
  </>;
}

export default Home;
