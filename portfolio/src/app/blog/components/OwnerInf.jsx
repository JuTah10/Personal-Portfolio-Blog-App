import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

import { OwnerSocials } from "@/constant/OwnerSocial";

export default function OwnerInf() {
    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle>My Socials:</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {OwnerSocials.map(({ name, link, Icon, action, label }) => (
                        <div key={name} className="w-full flex gap-2 items-center justify-between ">
                            <div className="w-[60%] flex items-center gap-3">
                                <Link
                                    key={name}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                    className="text-2xl text-muted-foreground hover:text-primary transition"
                                >
                                    <Icon size={15} />
                                </Link>

                                <div className="text-xs">
                                    <Link
                                        href={link} className="font-medium cursor-pointer"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={name}
                                    >
                                        {name}
                                    </Link>

                                </div>
                            </div>
                            <Button
                                size={"sm"}
                                variant={"secondary"}
                                className="w-17 cursor-pointer"
                            >
                                <Link
                                    href={link} className="font-medium cursor-pointer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                >
                                    {action}
                                </Link>

                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card >
    );
}
