import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.metatype === Date) {
      value = new Date(value);
      if (isNaN(value.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      value = value.toUTCString();
    }
    if (metadata.type === 'body' && metadata.data === 'name') {
      value = value.toUpperCase();
    } else if (metadata.type === 'param') {
      const idLength = parseInt(value, 10);
      if (!isNaN(idLength) && idLength > 0) {
        const randomId = Math.floor(Math.random() * Math.pow(10, idLength));
        value = randomId;
      }
    }
    console.log(metadata.metatype);
    return value;
  }
}
