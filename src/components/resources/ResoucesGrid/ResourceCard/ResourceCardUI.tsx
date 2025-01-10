'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ResourceData } from '@/queries/resources/resourceTypes'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface Props {
  resource: ResourceData
  index: number
}

export function ResourceCardUI({ resource, index }: Props) {
  console.log(resource.url)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <Card className="group w-rull sm:w-[350px] h-[250px] flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pt-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">@{resource.authorUsername}</span>
              <time className="text-xs text-muted-foreground">{format(new Date(resource.createdAt), 'MMM d, yyyy')}</time>
            </div>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground opacity-0 transition-opacity cursor-pointer hover:bg-muted group-hover:opacity-100"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2">
            <h3 className="leading-tight tracking-tight line-clamp-3">{resource.text}</h3>
            {resource.description && <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex p-3 !items-center justify-start">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {resource.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
