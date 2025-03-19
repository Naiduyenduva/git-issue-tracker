import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { RepositoryState, issuetype, Repository } from '../client/types'

const Repositories: React.FC<{repositories: Repository[] | RepositoryState;issues:issuetype[]}> = ({repositories,issues}) => {
  return (
    <div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            { Array.isArray(repositories) ? (
            repositories.map((repo) => (
              <Card
                key={repo.id}
                className={`cursor-pointer hover:border-primary transition-colors`}
                
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    {repo.name}
                  </CardTitle>
                  <CardDescription>{repo.owner}/{repo.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>{issues.length} issues</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href={`https://github.com/${repo.owner}/${repo.name}`} target="_blank">
                      View on GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
            ) : (<p>Hello this is error</p>)
          }
          </div>
    </div>
  )
}

export default Repositories