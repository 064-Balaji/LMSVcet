import { auth } from "@/auth"
import LeaveForm from "@/components/Leave/LeaveForm"
import { prisma } from "@/prisma/prisma";

export default async function LeaveRequestForm() {
    const session = await auth();
    let userData = null;
    if (session?.user.type === 'student') {
        userData = await prisma.student.findUnique({
            where: { id: session.user.id },
            include: { department: true, section: true, batch: true }
        })
        
    } else if (session?.user.type === 'staff') {
        userData = await prisma.staff.findUnique({
            where: { id: session.user.id },
            include: { department: true, section: true }
        })
    } else {
        return userData;
    }
    return (
        <LeaveForm userType={session.user.type} userData={userData} />
    )
}