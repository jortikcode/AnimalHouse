export default function Login(props){
    return (
        <>
            <div className="flex flex-col space-y-20 h-screen w-full pt-32 justify-start items-center dark:bg-black">
                <h1 className="text-4xl dark:text-white"> Login page </h1>
                <form>
                    <label className="dark:text-white text-xl p-3" htmlFor="username">Username: </label>
                    <input type="text" placeholder="username" name="username" id="username" />
                    <label className="dark:text-white text-xl p-3" htmlFor="password">Password: </label>
                    <input type="password" placeholder="password" name="password" id="password" />
                </form>
            </div>
        </>
    );
}