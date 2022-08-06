import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Post('create')
    createArticle(@Body() article: Article){
        return this.articleService.createArticle(article);
    }
    @Patch('update')
    updateArticle(@Body() article: Article){
        return this.articleService.updateArticle(article);
    }
    @Delete('delete')
    deleteArticle(@Body() id: string){
        return this.articleService.deleteArticle(id);
    }
}
