class EntriesController < ApplicationController

	def index
	  entries = Entry.all
	  options = { 
	  	include: [:type]
	  }
	  render json: EntrySerializer.new(entries)
	end


	#def show
	#  entry = Entry.find(params[:id])
	#  render json: entry, status: 200 
	#end

	def create
	  entry = Entry.new(entry_params)
	  if entry.save
	  	render json: EntrySerializer.new(entry), status: :accepted
	  else
	  	render json: {errors: entry.errors.full_messages}, status:
	  	:unprocessible_entity
	  end
	end

# necessary @
	#def update
    #    @entry.update(entry_params)
    #   if @entry.save
    #	render json: @entry, status: 200
    #   else
    #	render json: { errors: @entry.errors.full_messages }, status: :unprocessible_entity
    #   end
  	#end

	#def destroy
	#	entry = Entry.find_by(id: params[:id])
	#	entry.destroy
	#	render json: entry
	#end
    
    private

      def entry_params
        params.require(:entry).permit(:date, :content, :type_id)
      end

# necessary @
    #  def find_entry
    #	@entry = Entry.find(params[:id])
    #  end

end