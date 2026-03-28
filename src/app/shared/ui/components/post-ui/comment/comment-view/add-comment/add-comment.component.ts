import { Component, EventEmitter, Output, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../comments.service';
import { Comment } from '../../comment.interface';

@Component({
  selector: 'app-add-comment',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  private readonly commentsService = inject(CommentsService)
  @Output() submitData = new EventEmitter<FormData>()
  @Output() editDataEvent = new EventEmitter<FormData>()
  @Input() editData?: FormData|null;

  commentImage: any;
  commentImagePreview: any;
  commentBody: FormControl = new FormControl("")
 

  ngOnChanges(changes: SimpleChanges) {
    this.removeContent()
    this.removeImage()
  
    const data=new FormData()
    if (changes['editData'] && this.editData) {
      if (this.editData.get('content')) {
        this.commentBody.setValue(this.editData.get('content'))
      }
      if (this.editData.get('image')) {
        this.commentImagePreview = this.editData.get('image')
      }
      console.log('on changes')
    }
  }

  updateData(e: Event) {
    e.preventDefault()

    const formData = new FormData()
    
    if (this.commentBody.value) {
      formData.append('content', this.commentBody.value)
    }
    
    if (this.commentImage) {
      formData.append('image', this.commentImage)
    }

    this.editDataEvent.emit(formData)
    this.editData=null;
    this.removeContent()
    this.removeImage()
  }

  createComment(e: Event) {
    e.preventDefault()

    const formData = new FormData()

    if (this.commentBody.value) {
      formData.append('content', this.commentBody.value)
    }

    if (this.commentImage !==null) {
      formData.append('image', this.commentImage)
    }


    this.submitData.emit(formData)

    this.removeContent()
    this.removeImage()
  }

  changeImage(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.commentImage = input.files[0]
      const x = new FileReader()
      x.readAsDataURL(input.files[0])
      x.onload = ((e: ProgressEvent<FileReader>) => {
        this.commentImagePreview = e.target?.result;
      })
    }
  }

  removeImage() {
    this.commentImage = null;
    this.commentImagePreview = null
   
  }

  removeContent() {
    this.commentBody.reset()
  }


}


