import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {

  private readonly marchEsClient: Client;

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    this.marchEsClient = new Client({
      node: configService.get('URL'),
      auth: {
        username: configService.get('USERNAME'),
        password: configService.get('PASS')
      }
    });
  }

  async search(search: { key: string }) {

    return {};
  }

  async getall(search: { key: string }) {
    console.log('triggered', search);

    const data = await this.marchEsClient.search({
      index: "march",
      body: {
        "query": { "match": { "official_id": search } }
      }
    });
    return { results: data.body.hits.hits[0]._source };
  }

  async addpro(details: { key: string }) {
    return 'true';
  }
}
