class EntriesController < ApplicationController

  def index
     entries = Entry.all
     options = { include: [:category] }
     render json: EntrySerializer.new(entries, options)
  end

  def show
    entry = Entry.find_by(id: params[:id])
      if entry
        options = { include: [:category] }
        render json: { entry: EntrySerializer.new(entry, options) }, status: 
        :accepted
      else
        render json: { errors: entry.errors.full_messages }, status: 
        :unprocessible_entity
      end
  end

  def create
    entry = Entry.new(entry_params)
    if entry.save
      options = { include: [:category] }
      render json: EntrySerializer.new(entry, options), status: :accepted
    else
      render json: {errors: entry.errors.full_messages}, status:
      :unprocessible_entity
    end
  end

  def update
    #entry = Entry.find(params[:id])
    entry = Entry.find_by(id: params[:id])
    entry.update(entry_params)
      if entry.save    
         render json: entry, status: 200
      else
         render json: { errors: entry.errors.full_messages }, status: :unprocessible_entity
      end
  end

  private

  def entry_params
	 params.require(:entry).permit(:id, :type, :date, :content, :category_id) #, :category, 
	   #:created_at, :updated_at, :_destroy,
	    #{ category_attributes: [:id, :name, :entry_id, :created_at, :updated_at, :_destroy ]} )
  end
end