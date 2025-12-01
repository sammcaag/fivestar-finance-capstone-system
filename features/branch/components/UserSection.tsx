import { useRouter } from "next/navigation";
import { UserSectionProps, UserType } from "../types/branch-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Plus, User, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { Button } from "@/components/ui/button";

export default function UserSection({ users, type }: UserSectionProps) {
  const router = useRouter();
  const isStaff = type === "staff";

  const themeColors = {
    staff: {
      icon: "bg-indigo-100 text-indigo-600",
      gradient: "from-indigo-200 to-indigo-300",
      badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
      fallback: "bg-indigo-50 text-indigo-600",
      empty: "bg-indigo-100 text-indigo-600",
      button: "bg-indigo-50 text-indigo-700",
      addButton: "border-indigo-300 bg-indigo-50/50 text-indigo-600",
      addButtonText: "text-indigo-700",
    },
    client: {
      icon: "bg-sky-100 text-sky-600",
      gradient: "from-sky-200 to-sky-300",
      badge: "bg-sky-100 text-sky-800 border-sky-200",
      fallback: "bg-sky-50 text-sky-600",
      empty: "bg-sky-100 text-sky-600",
      button: "bg-sky-50 text-sky-700",
      addButton: "border-sky-300 bg-sky-50/50 text-sky-600",
      addButtonText: "text-sky-700",
    },
  };

  const colors = themeColors[type];
  const title = isStaff ? "Staff Information" : "Client Information";
  const description = isStaff
    ? "Verify the staff currently linked to this branch, along with their roles."
    : "Verify the clients currently linked to this branch, along with their roles.";
  const emptyMessage = isStaff
    ? "THERE IS NO STAFF UNDER THIS BRANCH"
    : "THERE IS NO CLIENT UNDER THIS BRANCH";
  const addButtonText = isStaff ? "Add Staff" : "Add Client";
  const registerRoute = isStaff ? "/staff/register" : "/clients/register";

  const getUserRoute = (user: UserType) => {
    return isStaff ? `/staff/${user.staffId}` : `/clients/${user.clientPension?.serialNumber}`;
  };

  const getUserId = (user: UserType) => {
    return isStaff ? user.staffId : user.clientPension?.serialNumber;
  };

  const getBadgeText = (user: UserType) => {
    return isStaff ? user.userAuth.role : "Client";
  };

  return (
    <Card className="border">
      <CardHeader className="flex-row gap-4 items-center px-6">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.icon}`}>
          {isStaff ? <User2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </span>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <Separator className="mb-6" />

      <CardContent className="space-y-6 px-0">
        <section className="flex flex-wrap justify-center gap-6 px-6 max-w-5xl mx-auto my-20">
          {users.length > 0 ? (
            <>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-center text-center w-[calc(33.333%-1rem)] min-w-[200px] cursor-pointer"
                  onClick={() => router.push(getUserRoute(user))}
                >
                  <Avatar
                    className={`h-32 w-32 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-3xl font-bold shadow-lg overflow-hidden hover-card transition-all`}
                  >
                    {user.avatarUrl ? (
                      <AvatarImage
                        src={user.avatarUrl}
                        alt={user.fullName}
                        width={128}
                        height={128}
                        className="h-32 w-32 object-cover"
                      />
                    ) : (
                      <AvatarFallback className={`${colors.fallback} text-4xl font-semibold`}>
                        {avatarFallBack(user.fullName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span
                    className={`inline-flex items-center rounded-full ${colors.badge} px-3 py-1 mt-3 text-xs font-semibold border`}
                  >
                    {getBadgeText(user)}
                  </span>
                  <span className="text-base font-semibold text-foreground mt-2">
                    {user.fullName}
                  </span>
                  <span className="text-sm text-muted-foreground">{getUserId(user)}</span>
                </div>
              ))}
              <div
                className="flex flex-col items-center justify-center text-center w-[calc(33.333%-1rem)] min-w-[200px] cursor-pointer"
                onClick={() => router.push(registerRoute)}
              >
                <div
                  className={`h-32 w-32 rounded-full border-2 border-dashed ${colors.addButton} flex items-center justify-center hover-card transition-all`}
                >
                  <Plus className="h-12 w-12" />
                </div>
                <span className={`text-base font-semibold ${colors.addButtonText} mt-3`}>
                  {addButtonText}
                </span>
              </div>
            </>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24">
              <span
                className={`flex h-36 w-36 items-center justify-center rounded-full ${colors.empty}`}
              >
                <HelpCircle className="h-28 w-28" />
              </span>
              <p className="text-muted-foreground font-medium text-center text-lg">
                {emptyMessage}
              </p>
              <Button
                variant="outline"
                className={`${colors.button} text-base`}
                onClick={() => router.push(registerRoute)}
              >
                {addButtonText}
              </Button>
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
