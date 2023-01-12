import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    service = TestBed.inject(MessageService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`messages has default value`, () => {
    expect(service.messages).toEqual([]);
  });

  it('should clear all messages',  () => {
    service.add('New message');

    service.clear();

    expect(service.messages.length).toEqual(0);
  })
});
