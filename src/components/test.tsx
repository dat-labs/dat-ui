import { Button } from "@/components/ui/button"
import { signOut } from "@/auth";


export default function Test() {
    const logout = async () => {
        "use server"
        await signOut()
    }
    return (
        <form action={logout}>
        <Button type="submit" onClick={logout}>Click me</Button>
        </form>
    )
}