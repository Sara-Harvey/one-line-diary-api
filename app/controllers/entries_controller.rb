class EntriesController < ApplicationController

	def index
	   entries = Entry.all
	   options = { include: [:type] }
	   render json: EntrySerializer.new(entries, options)
	end

  def show
    entry = Entry.find_by(id: params[:id])
      if entry
        options = { include: [:type] }
        render json: { entry: EntrySerializer.new(entry, options) }, status: :accepted
      else
        render json: { errors: entry.errors.full_messages }, status: :unprocessible_entity
      end
  end

=begin
  def show
    entry = Entry.find_by(id: params[:id])
      if entry
        render json: { entry: EntrySerializer.new(entry) }, status: :accepted
      else
        render json: { errors: entry.errors.full_messages }, status: :unprocessible_entity
      end
  end
=end

  def create
    entry = Entry.new(entry_params)
    if entry.save
      options = { include: [:type] }
      render json: EntrySerializer.new(entry, options), status: :accepted
    else
      render json: {errors: entry.errors.full_messages}, status:
      :unprocessible_entity
    end
  end

	def update
		entry = Entry.find_by(id: params[:id])
    entry.update(entry_params)
      if entry.save    
    	   render json: entry, status: 200
      else
    	   render json: { errors: entry.errors.full_messages }, status: :unprocessible_entity
      end
  end

	def destroy
		entry = Entry.find_by(id: params[:id])
		entry.destroy
		render json: entry
	end

  private
    def entry_params
      params.require(:entry).permit( :id, :type, :date, :content, :type_id, 
        type: [:id, :name, :created_at, :updated_at, :_destroy, :entry_id ])
    end

=begin
  def sight_params #strong parameters
    params.require(:sight).permit(:title, :content, category_ids:[], categories_attributes: [:name], sight_cats_attributes: [:location])
  end
=end

=begin
  private
    def entry_params
      params.require(:entry).permit(:id, :type, :date, :content, :type_id, 
        type: [:id, :name, :created_at, :updated_at, :_destroy], relationships: [] )
    end
=end
end